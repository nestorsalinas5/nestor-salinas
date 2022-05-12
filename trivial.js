// 1

var questions = [

	[

		"¿Qué es tecnología?",

		"Hace más divertida nuestro estilo de vida.",

		"Conjunto de conocimientos técnicos aplicado de forma lógica.",

		"La televisión los reproductores de música.",

		"Todas son correctas.",


		1
	],

	[

		"¿Qué es tortícolis?",


		"Uso desmedido y sin control de la tecnología.",

		"Conjunto de conocimientos técnicos aplicado de forma lógica.",

		"Graves problemas de salud.",

		"Torcimiento del cuello.",

		3

	],

	[

		"Síntomas de la depresión",

		"Estado de ánimo irritable,Dificultad para conciliar el sueño, cambios grandes en el apetito",

		"Fiebre , dolor de cabeza.",

		"Náuceas, vomitos.",

		"Ninguna de las anteriores.",

		0

	],

	[

		"Ventajas de la tecnología.",

		"Movilizar y disgregrar la masa rígida, calor con rayos infrarrojos.",

		"Permite la comunicación e interpretación en la sociedad, fomenta la capacidad de aprendizaje.",

		"Menor seguridad para la sociedad. ",

		"Ninguno de los anteriores.",

		2

	],

	[

		"Síntomas  de falta de atención",

		"Falta de apetito, sueño, sudoración.",

		"Falta de sueño, Menor rendimiento,Ansiedad.",

		"Estado de ánimo irritable, falta de energía.",

		"Todas son correctas.",

		1

	],
[

		"¿Qué es tendinítis?",

		"Inflamación de un tendón debida, generalmente, a un golpe o a un esfuerzo excesivo.",

		"Abarcan una amplia variedad de trastornos.",
		"Estado de contracción involuntaria de los músculos cervicales.",
		"Reacción que se desencadena en una parte del organismo o en los tejidos de un órgano, caracterizada por un enrojecimiento de la zona..",

		0

	],

];
// 2
 var questionTemplate = _.template(" \
 <div class='card question'><span class='question'><%= question %></span> \
 <ul class='options'> \
 <li> \
 <input type='radio' name='question[<%= index %>]' value='0' id='q<%= index %>o1'> \
 <label for='q<%= index %>o1'><%= a %></label> \
 </li> \
 <li> \
 <input type='radio' name='question[<%= index %>]' value='1' id='q<%= index %>o2'> \
 <label for='q<%= index %>o2'><%= b %></label> \
 </li> \
 <li> \
 <input type='radio' name='question[<%= index %>]' value='2' id='q<%= index %>o3'> \
 <label for='q<%= index %>o3'><%= c %></label> \
 </li> \
 <li> \
 <input type='radio' name='question[<%= index %>]' value='3' id='q<%= index %>o4'> \
 <label for='q<%= index %>o4'><%= d %></label> \
 </li> \
 </ul> \
 </div> \
 ");


// 3
 var points,
 pointsPerQuestion,
 currentQuestion,
 questionTimer,
 timeForQuestion = 8, // seconds
 timeLeftForQuestion;
 // 4
 $(function() {


 // 5
 $('button.start').click(start);
 $('.play_again button').click(restart);


 // 6
 function restart() {
 points = 0;
 pointsPerQuestion = 10;
 currentQuestion = 0;
 timeLeftForQuestion = timeForQuestion;
 // 7
 $('.finish.card').hide();
 $('div.start').show();
 $('.times_up').hide();


 generateCards();
 updateTime();
 updatePoints();
 }


 // 8
 function start() {
 $('div.start').fadeOut(200, function() {
 moveToNextQuestion();
 });
 }


 // 9
 function generateCards() {
 $('.questions').html('');
 for (var i = 0; i < questions.length; i++) {
 var q = questions[i];
 var html = questionTemplate({
 question: q[0],
 index: i,
 a: q[1],
 b: q[2],
 c: q[3],
 d: q[4]
 });
 $('.questions').append(html);
 };


 // 10
 $('.question.card input').change(optionSelected);
 }


 // 11
 function moveToNextQuestion() {
 currentQuestion += 1;
 if (currentQuestion > 1) {
 $('.question.card:nth-child(' + (currentQuestion-1) + ')').hide();
 }


 // 12
 showQuestionCardAtIndex(currentQuestion);
 setupQuestionTimer();
 }


 // 13
 function setupQuestionTimer() {
 if (currentQuestion > 1) {
 clearTimeout(questionTimer);
 }
 timeLeftForQuestion = timeForQuestion;


 // 14
 questionTimer = setTimeout(countdownTick, 1000);
 }


 // 15
 function showQuestionCardAtIndex(index) { // staring at 1
 var $card = $('.question.card:nth-child(' + index + ')').show();
 }


 // 16
 function countdownTick() {
 timeLeftForQuestion -= 1;
 updateTime();
 if (timeLeftForQuestion == 0) {
 return finish();
 }
 questionTimer = setTimeout(countdownTick, 1000);
 }


 // 17
 function updateTime() {
 $('.countdown .time_left').html(timeLeftForQuestion + 's');
 }


 // 18
 function updatePoints() {
 $('.points span.points').html(points + ' puntos');
 }


 // 19
 function optionSelected() {
 var selected = parseInt(this.value);
 var correct = questions[currentQuestion-1][5];


 if (selected == correct) {
 points += pointsPerQuestion;
 updatePoints();
 correctAnimation();
 } else {
 wrongAnimation();
 }


 if (currentQuestion == questions.length) {
 clearTimeout(questionTimer);
 return finish();
 }
 moveToNextQuestion();
 }


 // 20
 function correctAnimation() {
 animatePoints('right');
 }


 // 21
 function wrongAnimation() {
 animatePoints('wrong');
 }


 // 22
 function animatePoints(cls) {
 $('header .points').addClass('animate ' + cls);
 setTimeout(function() {
 $('header .points').removeClass('animate ' + cls);
 }, 500);
 }


 // 23
 function finish() {
 if (timeLeftForQuestion == 0) {
 $('.times_up').show();
 }
 $('p.final_points').html(points + ' puntos');
 $('.question.card:visible').hide();
 $('.finish.card').show();
 }


 // 24
 restart();


});