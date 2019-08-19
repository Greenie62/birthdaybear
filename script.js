//grab our HTML elements that will gain 'behavior'

var icons=document.querySelectorAll("i")
var messages=document.querySelectorAll(".message")
var lemons=document.querySelectorAll('.lemon')


icons.forEach((i,index)=>{
    i.addEventListener("mouseenter",(e)=>{
        console.log(index)
       if(index < icons.length -1){
           console.log("hey!!")
       //render message
       messages[index].style.display='block'
       }
        
    })

    i.addEventListener("mouseleave",(e)=>{
        console.log(e.target)
      if(index < icons.length -1){
          //clear the area
        messages[index].style.display='none'
      }
    })

    i.addEventListener("click",(e)=>{
        //based upon classname(that we manipulate a bit for a more sensible string)
        //we make to the giphyAPI with the current topic value
        var topic=e.target.className.split("fa-")
        console.log(topic[1])

        switch(topic[1]){

            case "beer":
            getGifs("beer")
            break;

            case "football-ball":
            getGifs("patriots")
            break;

            case "paw":
            getGifs("bear")
            break;

            case "gift":
            getGifs("birthday")
            break;

            case "lemon":
            speakLemon()
            break;

            default:
            console.log("WTF did you click?! :(")
            break;
        }
    })
})



function getGifs(arg="football"){

    var apikey="6gRm9WZ0hk8YcvjvVS4tX2HAAnV5WmgE"
    fetch(`https://api.giphy.com/v1/gifs/search?apikey=${apikey}&q='${arg}'`)
    .then(res=>res.json())
    .then(res=>{
        var data=res.data;
        console.log(res)
        var html=`<img src=${data[data.length * Math.random() | 0].images.fixed_height.url} alt="gif">`
        document.querySelector(".output").innerHTML=html
    })
}


function speakLemon(){
    var expressions=["Happy Birthday Bear", "Argh Argh Argh", "A hoy hoy, Tom Brady and company coming for ya!", "Dont make the waves, until the waves come", "Ahh picture this!", "I swear on my life!", "Ahhh, sure do enjoy a good wobbly pop", "Ahh hum bug", "Just want to drive around!", "A L E X, A L E, no no, A L E X A N...hello!? A L E X A N D E R. Pizza at Alexander!", "My trunk does not discriminate, it'll carry out any of you punks"]
    var SS=window.SpeechSynthesisUtterance || window.webkitSpeechSynthesisUtterance

    var speech=new SS();

    speech.text=expressions[expressions.length * Math.random() | 0]

    window.speechSynthesis.speak(speech)
    document.querySelector(".output").innerHTML=speech.text

    setTimeout(()=>{
        document.querySelector(".output").innerHTML=""
    },4000)
}


lemons.forEach((lemon,index)=>{
    lemon.addEventListener("mouseenter",(e)=>{
        e.target.nextElementSibling.style.display='block'
    })

    lemon.addEventListener("mouseleave",(e)=>{
        e.target.nextElementSibling.style.display='none'
    })

    lemon.addEventListener("click",speakLemon)
})