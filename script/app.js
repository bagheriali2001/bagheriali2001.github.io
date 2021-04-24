var div = document.getElementById("div-container");

const text = [`<h5>Check my resume</h5>`,
    `<ul>
        <li><a href="mailto:alibagheri.1379.1389@gmail.com">Email</a></li>
        <li><a href="https://linkedin.com/in/ali-bagheri-725818198">Linkedin</a></li>
        <li><a href="https://github.com/bagheriali2001">Github</a></li>
        <li><a href="https:/twitter.com/bagheriali2001">Twitter</a></li>
        <li><a href="https://telegram.me/bagheriali2001">Telegram</a></li>
    </ul>
    <p>C:\Users\Ali>TYPE resume.txt</p>`,
    `<h3>Contact information and links</h3>
    <p>C:\Users\Ali>TYPE links-list.txt</p>`,
    `<ul>
        <li><a href="https://github.com/bagheriali2001/Web-midterm-project">Noshirvani institute of technology, information technology center website (as Back-end developer)</a></li>
        <li><a href="https://github.com/bagheriali2001/Ecommerce-REST-API">Ecommerce-REST-API</a></li>
    </ul>
    <p>C:\Users\Ali>ECHO Contact information and links</p>`,
    `<h3>Projects</h3>
    <p>C:\Users\Ali>TYPE projects-list.txt</p>`,
    `<ul>
        <li>Node.js</li>
        <li>Express.js</li>
        <li>Javascript</li>
        <li>Mongoose</li>
        <li>Sequelize.js</li>
        <li>REST Api</li>
        <li>Git version control</li>
        <li>HTML5</li>
        <li>CSS</li>
        <li>C++</li>
        <li>Java</li>
    </ul>
    <p>C:\Users\Ali>ECHO Projects</p>`,
    `<h3>Profissional skills</h3>
    <p>C:\Users\Ali>TYPE skills-list.txt</p>`,
    `<p>I am a hardworking man, whose challenges could never stop.
        I am a self-learner who wouldn't take a rest when it is hard to learn.
        I am a good team player who would help others in the team to reach our goals.
        When I start a project my only focus is on that and I would finish it way before the deadline.
        As a former computer olampyad participant, I am known for my different views on problems and the way I solve them.
        I try to be like a diamond when I am under pressure. I would adapt to hard situations to have my best performance.
        I am always interested to try new things and gain experience.
    </p>
    <p>C:\Users\Ali>ECHO Profissional skills</p>`,
    `<h3>About me</h3>
    <p>C:\Users\Ali>TYPE about-me.txt</p>`,
    `<p>I am a computer engineer student at Babol Noshirvani institute of technology,
        who is interested in AI and Back-end development. I am currently working as a junior back-end developer.
        I am living in <a href="https://www.google.com/maps/place/Arak,+Markazi+Province,+Iran">Arak</a> but I am open to relocating for positions in <a href="https://www.google.com/maps/place/Tehran,+Tehran+Province,+Iran">Tehran</a>.</p>
    <p>C:\Users\Ali>ECHO About me</p>`,
    `<h3>Who am I?</h3>
    <p>C:\Users\Ali>TYPE who-am-i.txt</p>`,
    `<h1>Ali Bagheri</h1>
    <p>C:\Users\Ali>ECHO Who am I?</p>`,
    `<p>C:\Users\Ali>TYPE name.txt</p>`
]

window.addEventListener("keyup",(e)=>{ 
    document.getElementById('notice-p').style.display='none'
    if(e.keyCode === 13){
        div.innerHTML = div.innerHTML + text.pop()
      }
})