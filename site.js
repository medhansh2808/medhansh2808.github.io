(() => {
  const root=document.documentElement, theme=document.getElementById('theme');
  let stored;try{stored=localStorage.getItem('medhansh-theme')}catch{}
  if(stored==='night')root.dataset.theme='night';
  function themeLabel(){theme.setAttribute('aria-label',root.dataset.theme==='night'?'Switch to light theme':'Switch to dark theme')}
  themeLabel();theme.addEventListener('click',()=>{root.dataset.theme=root.dataset.theme==='night'?'day':'night';themeLabel();try{localStorage.setItem('medhansh-theme',root.dataset.theme)}catch{}});
  const dialog=document.getElementById('demo-dialog'),video=document.getElementById('demo-video');
  if(dialog&&video){
  function showDemo(){dialog.showModal();video.play().catch(()=>{});}
  document.getElementById('watch-demo').addEventListener('click',showDemo);document.getElementById('photo-demo').addEventListener('click',showDemo);
  document.getElementById('close-demo').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>video.pause());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
  }
  if(!document.getElementById('ascent'))return;
  const nodes={};for(const id of ['person','traveler','back-leg','front-leg','back-foot','front-foot','body','arm-back','arm-front','head','stone','stone-texture','dust'])nodes[id]=document.getElementById(id);
  const motion=document.getElementById('motion'),reduce=matchMedia('(prefers-reduced-motion: reduce)');let paused=reduce.matches,visible=true,elapsed=2,last=0;
  function label(){motion.setAttribute('aria-pressed',String(paused));motion.setAttribute('aria-label',paused?'Resume Sisyphus animation':'Pause Sisyphus animation');document.getElementById('pause-icon').innerHTML=paused?'<path d="m4 2 7 5-7 5Z" fill="currentColor"/>':'<path d="M4 3v8M10 3v8" stroke="currentColor" stroke-width="1.4"/>'}
  label();motion.addEventListener('click',()=>{paused=!paused;label()});reduce.addEventListener('change',e=>{paused=e.matches;label()});
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting},{threshold:0}).observe(document.getElementById('ascent'));
  // Coordinates use the hill's tangent. Feet have a planted phase and a lifted return.
  function draw(t){
    const phase=t%20, ease=v=>v*v*(3-2*v);
    const returning=phase>=14, progress=phase<12?phase/12:phase<14?1:1-ease((phase-14)/6);
    const x=78+progress*164,y=211-(x-8)*.395;
    // The boulder accelerates downhill, then rests while Sisyphus returns.
    const roll=phase<12?progress:phase<15?1-Math.pow((phase-12)/3,1.5):0;
    const rockX=78+roll*164, rockY=211-(rockX-8)*.395;
    nodes.person.setAttribute('transform',returning?'translate(-32 0) scale(-1 1)':'');
    nodes.traveler.setAttribute('transform',`translate(${x.toFixed(2)} ${y.toFixed(2)})`);
    nodes.traveler.style.opacity='1';
    const cycle=t*1.05,hip=[-16,-22+Math.sin(cycle*Math.PI*4)*.6],shoulder=[-4,-42+Math.sin(cycle*Math.PI*4)*.4];
    function foot(offset){const p=(cycle+offset)%1;let fx=p<.65?-5-p/.65*18:-23+(p-.65)/.35*18;return [fx,-fx*.395-1-(p>.65?Math.sin((p-.65)/.35*Math.PI)*6:0)]}
    function leg(id,f,back){const knee=[(hip[0]+f[0])/2+(back?5:1),(hip[1]+f[1])/2-2];nodes[id].setAttribute('d',`M${hip} L${knee} L${f}`);nodes[id.replace('leg','foot')].setAttribute('d',`M${f[0]-1},${f[1]}l6,-2`)}
    leg('back-leg',foot(.5),true);leg('front-leg',foot(0),false);
    nodes.body.setAttribute('d',`M${hip[0]-5},${hip[1]+2} Q${hip[0]-4},${hip[1]-10} ${shoulder[0]-4},${shoulder[1]-2} Q${shoulder[0]+2},${shoulder[1]-4} ${shoulder[0]+5},${shoulder[1]+2} L${hip[0]+5},${hip[1]+4}Z`);
    const bounce=phase>=15&&phase<16?Math.sin((phase-15)*Math.PI*3)*Math.exp(-(phase-15)*4)*3:0;const stone=[rockX-x+31,rockY-y-35-Math.abs(bounce)];nodes.stone.setAttribute('transform',`translate(${stone})`);nodes['stone-texture'].setAttribute('transform',`rotate(${-roll*450})`);
    nodes['arm-back'].setAttribute('d',`M${shoulder[0]},${shoulder[1]+5}L4,-33L11,-29`);
    nodes['arm-front'].setAttribute('d',`M${shoulder[0]+1},${shoulder[1]}L5,-36L11,-38`);
    nodes.head.setAttribute('transform',`translate(${shoulder[0]+3} ${shoulder[1]-8})`);
    if(returning){const swing=Math.sin(t*7)*5;nodes['arm-back'].setAttribute('d',`M${shoulder[0]},${shoulder[1]+5}l${swing},14`);nodes['arm-front'].setAttribute('d',`M${shoulder[0]+1},${shoulder[1]}l${-swing},17`);}
    nodes.dust.style.opacity=String(phase<12||returning?.15+.15*(1+Math.sin(t*6))/2:0);
  }
  draw(elapsed);function frame(now){const dt=Math.min((now-last)/1000,.05);last=now;if(!paused&&visible&&!document.hidden){elapsed+=dt;draw(elapsed)}requestAnimationFrame(frame)}requestAnimationFrame(frame);
})();
