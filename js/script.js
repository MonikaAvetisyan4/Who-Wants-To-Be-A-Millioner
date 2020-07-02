$(function(){
	var correct=new Audio('./sounds/correct answer.mp3');
	var wrong=new Audio('./sounds/wrong answer.mp3');
	var playGame=new Audio('./sounds/lets play.mp3');
	var million=new Audio('./sounds/million.mp3')
	var money = [100,500,1000,4000,16000,25000,50000,100000,500000,1000000];
	var moneyLength=money.length;
	var icon = $('<img>').attr('src','images/icon.png');

	for(let i = 0; i < money.length; i ++){
		var k = money[i]; 
		$('.money').append( $('<div>').attr('class','smallest').html((i+1)+'<img class="icon" src="images/icon.png">'+' : '+"<span class='price'>" + k +"</span>"+' $'));
	}

	var buttons=$('button');
	var data = [
				{
					question:'What is the result of [4+3(5+6)+3*2=?]',
					answers:["80","43","42","56"],
					answer_index:1
				},
				{
					question:'What is the capital city of Armenia',
					answers:['Erevan','Moscow','Berlin','Tbilisi'],
					answer_index:0
				},{
					question:'What is the capital city of Russia',
					answers:['Peru','London','Berlin','Moscow'],
					answer_index:3
				},{
					question:'What is the capital city of USA',
					answers:['Erevan','Russia','Washington','Tbilisi'],
					answer_index:2
				},{
					question:'What is the capital city of UK',
					answers:['Erevan','London','Berlin','Tbilisi'],
					answer_index:1
				},
				{
					question:'The Earth is approximately how many miles away from the Sun?',
					answers:["9.3 million"," 39 million"," 93 million"," 193 million"],
					answer_index:2
				},{
					question:'Which of the following men does not have a chemical element named for him?',
					answers:[" Albert Einstein"," Niels Bohr","Isaac Newton","Enrico Fermi"],
					answer_index:2
				},{
					question:'According to the Population Reference Bureau, what is the approximate number of people who have ever lived on earth?',
					answers:[" 5o billion","100 billion"," 1 trillion","5 trillion"],
					answer_index:1
				},{
					question:'How many days make up a non-leap year in the Islamic calendar?',
					answers:[" 365","400"," 354","376"],
					answer_index:2
				},{
					question:'What scientist first determined that human sight results from images projected onto the retina?',
					answers:[" Galileo","Copernicus"," Johannes Kepler","Isaac Newton"],
					answer_index:2
				},
	]
    if(!localStorage.getItem('counter')){

    	localStorage.setItem('counter',0);
    	localStorage.setItem('points',0);
    	localStorage.setItem('fiftyCounter',0);
    	localStorage.setItem('passCounter',0);

	}
	var btns = $('button');
	var t=localStorage.getItem('points');
	$('#mon').html(localStorage.getItem('points'))
    var counter=Number(localStorage.getItem('counter'));
	var money=Number(localStorage.getItem('points'));
	var smallest=$('.smallest')
	var points=$('.price');
   	var fiftyCounter=Number(localStorage.getItem('fiftyCounter'));

	var passCount=Number(localStorage.getItem('passCounter'))
		$('#50_50').on('click', function(){
		for(let i=0 ;i<btns.length;i++){
			if($(btns[i]).html()!=data[counter].answers[data[counter].answer_index]){
					 	fiftyCounter++;
					 	localStorage.setItem('fiftyCounter',fiftyCounter)
					 if( fiftyCounter <= 2){
			                  $(btns[i]).css('display','none') ; 
					 }	      
				 }
				 
			}
			
		})

	$('#pass').on('click', function(){
				if(passCount<1){
					passCount++;
					localStorage.setItem('passCounter',passCount)
					counter ++;
					localStorage.setItem('counter',counter);
					setTimeout(function(){

					location.reload();
				},2000)

				}
			})

    if(passCount==1){
		$('#pass').css({'border':'2px solid  #bf4239','border-radius':'20px','cursor':' no-drop'})

    }

	if(fiftyCounter >1){
		$('#50_50').css({'border':'2px solid  #bf4239','border-radius':'20px','cursor':' no-drop'})
	}

	if(counter < moneyLength){

		$('.question').html(data[counter].question);

		for(let j = 0; j < btns.length; j++){
			var text=$(btns[j]).html()
		         $(btns[j]).html(data[counter].answers[j]);

		}
		      

		for(let i=0;i<btns.length;i++){
				 $(btns[i]).on('click',  function(){
				
		         	if($(this).html()==data[counter].answers[data[counter].answer_index]){
		         		$(this).css({'background':'#FFB61E',"pointer-events": "none"});
		         		$(smallest[counter]).css('background','green');
		         		console.log($(smallest[counter]))
			              counter++;
			              localStorage.setItem('counter',counter);
			             var mon= Number(localStorage.getItem('points'));
                          t=Number($(points[counter-1]).html());
                         localStorage.setItem('points',t) ;
                         $('#mon').html(t)
			              setTimeout(function(){
			              	location.reload()
			              },3000)
			               correct.play(); 
		         	}else{
		         		$(this).css({'background':'red',"pointer-events": "none"});
		      				wrong.play();
		      			  setTimeout(function(){
		      			  	localStorage.clear()
			              	location.reload()
			              },5000)
		         	}

		         });
		        
		}
	}else {
		million.play();
		setTimeout(function(){
			localStorage.clear();
			location.reload();
		},3000)
		
	}
	
	
})
