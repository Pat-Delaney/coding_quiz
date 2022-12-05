
let questions = "";
let score = "";
let active_question = "";
let start_button = document.getElementById("start");
let high_scores = document.getElementsByClassName("high_scores");
let start_screen = document.getElementById("start_screen");
let timer_space = document.getElementById("timer");
let feedback = document.getElementById("feedback");
let game_over = document.getElementById("game_over");
let score_card = document.getElementById("scorecard");
let rematch = document.getElementById("rematch");
let score_screen = document.getElementById("score_screen");
let return_main = document.getElementById("return");
let clear_scores = document.getElementById("clear");
let initials = document.getElementById("initials");
let submit_button = document.getElementById("submit_button");
let score_list = document.getElementById("score_list");
let game_active = false;
let time = "";
let timerCount;
function quiz(){
    if (questions.length != 0 && time != 0 && game_active === true){
    let random_question = Math.floor(Math.random()*questions.length);
    active_question = questions[random_question];
    active_question.classList.remove("hidden");
    active_question.classList.add("visible");
    let answers = active_question.querySelectorAll("button");
    questions.splice(random_question,1);
    for (var i = 0; i < answers.length; i++) {
        answers[i].addEventListener("click", function () {
            active_question.classList.remove("visible");
            active_question.classList.add("hidden");
            if (this.classList.contains("wrong")){
                feedback.textContent = "Wrong!"
                time -= 10;
                quiz();
                return;
            }
            if (this.classList.contains("right")){
                feedback.textContent = "Right!"
                quiz();
                return;
            }
        })}}
    else{
        gameOver();
        return
        }

}
function gameOver(){
    clearInterval(timerCount);
    game_active = false;
    questions = "";
    timer_space.textContent = "";
    game_over.classList.remove("hidden");
    game_over.classList.add("visible");
    feedback.textContent = "";
    score = time;
    score_card.textContent = score;
    rematch.addEventListener("click", function(){
        game_over.classList.remove("visible");
        game_over.classList.add("hidden");
        start_screen.classList.remove("hidden");
        start_screen.classList.add("visible");
    })
}
function timer(){
    if (game_active===true){
        timerCount = setInterval(function() {
          time--;
          timer_space.textContent = time;
        if(time === 0){
            clearInterval(timerCount);
            gameOver();
        }
        }, 1000);
    }
    else{
        gameOver();
        return;
    }

}
start_button.addEventListener("click", function(){
        game_active = true;
        start_screen.classList.remove("visible");
        start_screen.classList.add("hidden");
        questions = [q1,q2,q3,q4,q5];
        time = 60;
        timer();
        quiz(); 
})
for (var i = 0; i < high_scores.length; i++) {
    high_scores[i].addEventListener("click", function () {
        if(game_active!=true){
        game_over.classList.remove("visible");
        game_over.classList.add("hidden");
        start_screen.classList.remove("visible");
        start_screen.classList.add("hidden");
        score_screen.classList.remove("hidden");
        score_screen.classList.add("visible");
        }
    })
}
return_main.addEventListener("click",function(){
    score_screen.classList.remove("visible");
    score_screen.classList.add("hidden");
    start_screen.classList.remove("hidden");
    start_screen.classList.add("visible");
}
)
submit_button.addEventListener("click", function(event){
    event.preventDefault();
    let player = initials.value.toUpperCase();
    let previousScore = localStorage.getItem("HighScores");
    localStorage.setItem("HighScores", score);
    if (previousScore <= score)
        {
            score_list.prepend(player+" ------ "+score+"\r\n");
        }
    else{
            score_list.append(player+" ------ "+score+"\r\n");
        }

})

clear_scores.addEventListener("click", function(){
 localStorage.clear();
 score_list.innerHTML = "";
})
