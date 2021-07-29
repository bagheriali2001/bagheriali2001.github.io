var div = document.getElementById("div-container");
var body = document.getElementById("body");

const text = [`<h5>Check my <a href="https://resume.io/r/jKiE7ZKvf">resume</a></h5>`,
    `<ul>
        <li><a href="mailto:alibagheri.1379.1389@gmail.com" id="email">Email</a></li>
        <li><a href="https://www.linkedin.com/in/bagheriali2001/" id="linkedin">Linkedin</a></li>
        <li><a href="https://github.com/bagheriali2001" id="github">Github</a></li>
        <li><a href="https:/twitter.com/bagheriali2001" id="twitter">Twitter</a></li>
        <li><a href="https://telegram.me/bagheriali2001" id="telegram">Telegram</a></li>
    </ul>
    <p>C:\\Users\\Ali>TYPE resume.txt</p>`,
    `<h3>Contact information and links</h3>
    <p>C:\\Users\\Ali>TYPE links-list.txt</p>`,
    `<ul>
        <li id="gaming">Gaming</li>
        <li id="watching">Watching movies and series</li>
        <li id="cycling">Cycling</li>
        <li id="memes">Creating Memes</li>
        <li id="commics">Creating Commics( i am not a writter :( )</li>
        <li id="youtube">Watching youtube videos</li>
        <li id="etc">etc ...</li>
    </ul>
    <p>C:\\Users\\Ali>ECHO Contact information and links</p>`,
    `<h3>Hobbies</h3>
    <p>C:\\Users\\Ali>TYPE hobbies-list.txt</p>`,
    `<ul>
        <li><a href="https://github.com/bagheriali2001/Web-midterm-project" id="web_midterm">Noshirvani institute of technology, information technology center website (as Back-end developer)</a></li>
        <li><a href="https://github.com/bagheriali2001/Ecommerce-REST-API" id="ecommerce">Ecommerce-REST-API</a></li>
    </ul>
    <p>C:\\Users\\Ali>ECHO Hobbies</p>`,
    `<h3>Projects</h3>
    <p>C:\\Users\\Ali>TYPE projects-list.txt</p>`,
    `<ul>
        <li id="node">Node.js</li>
        <li id="express">Express.js</li>
        <li id="js">Javascript</li>
        <li id="mongoose">Mongoose</li>
        <li id="mongodb">MongoDB</li>
        <li id="sequelize">Sequelize.js</li>
        <li id="sql">Sql</li>
        <li id="rest">REST API</li>
        <li id="git">Git version control</li>
        <li id="html">HTML5</li>
        <li id="css">CSS</li>
        <li id="cpp">C++</li>
        <li id="java">Java</li>
    </ul>
    <p>C:\\Users\\Ali>ECHO Projects</p>`,
    `<h3>Professional skills</h3>
    <p>C:\\Users\\Ali>TYPE skills-list.txt</p>`,
    `<p>I am a hardworking man, whose challenges could never stop.
     I am a self-learner who wouldn't take a rest when it is hard to learn.
      I am a good team player who would help others in the team to reach our goals.
       When I start a project my focus is on that and I would finish it before the deadline.
        As a former Computer Olympiad participant, I am known for my different views on problems and the way I solve them.
         I try to be like a diamond when I am under pressure.
         I would adapt to hard situations to have my best performance.
         I am always interested to try new things and gain experience.
    </p>
    <p>C:\\Users\\Ali>ECHO Professional skills</p>`,
    `<h3>About me</h3>
    <p>C:\\Users\\Ali>TYPE about-me.txt</p>`,
    `<p>I am a computer engineer student at Babol Noshirvani institute of technology,
        who is interested in AI and Back-end development. I am currently a junior back-end developer.
        I am living in <a href="https://www.google.com/maps/place/Arak,+Markazi+Province,+Iran">Arak</a> but I am open to relocating for positions in <a href="https://www.google.com/maps/place/Tehran,+Tehran+Province,+Iran">Tehran</a>.</p>
    <p>C:\\Users\\Ali>ECHO About me</p>`,
    `<h3>Who am I?</h3>
    <p>C:\\Users\\Ali>TYPE who-am-i.txt</p>`,
    `<h1>Ali Bagheri</h1>
    <p>C:\\Users\\Ali>ECHO Who am I?</p>`,
    `<p>C:\\Users\\Ali>TYPE name.txt</p>`
]
const easterEgg = [
    "57 65 27 72 65 20 6e 6f 20 73 74 72 61 6e 67 65 72 73 20 74 6f 20 6c 6f 76 65 2e 2e 2e",
    "59 6f 75 20 6b 6e 6f 77 20 74 68 65 20 72 75 6c 65 73 20 61 6e 64 20 73 6f 20 64 6f 20 49 2e 2e 2e",
    "41 20 66 75 6c 6c 20 63 6f 6d 6d 69 74 6d 65 6e 74 27 73 20 77 68 61 74 20 49 27 6d 20 74 68 69 6e 6b 69 6e 67 20 6f 66 2e 2e 2e",
    "59 6f 75 20 77 6f 75 6c 64 6e 27 74 20 67 65 74 20 74 68 69 73 20 66 72 6f 6d 20 61 6e 79 20 6f 74 68 65 72 20 67 75 79 2e 2e 2e"
]

window.addEventListener("keyup",(e)=>{ 
    document.getElementById('notice-p').style.display='none'
    if(e.keyCode === 13 && text.length > 0){
        div.innerHTML = div.innerHTML + text.pop()
      }
    window.scrollTo(0,document.body.scrollHeight);
})
body.addEventListener("touchstart", (e)=>{ 
    document.getElementById('notice-p').style.display='none'
    if(text.length > 0){
        div.innerHTML = div.innerHTML + text.pop()
      }
    window.scrollTo(0,document.body.scrollHeight);
}, false)
window.addEventListener("click", (e)=>{ 
    if( e.target.id == "memes"){
        console.log(`Congrats on finding this easter eeg. Enjoy it:
${easterEgg[0]}
${easterEgg[1]}
${easterEgg[2]}
${easterEgg[3]}`)
    }
    else if(e.target.id == "youtube"){
        console.log(`Congrats on finding this easter eeg. Enjoy it:
              *** https://bit.ly/3C22O78 ***`)
    }
    else{
        document.getElementById('notice-p').style.display='none'
        if( text.length > 0){
            div.innerHTML = div.innerHTML + text.pop()
        }
        window.scrollTo(0,document.body.scrollHeight);
    }
}, false)