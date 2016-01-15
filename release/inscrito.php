<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css"/>
<link rel="stylesheet" href="css/production.min.css" />
</head>
<style>
	body {
		color: white;
	}
	.ins-1 {
		text-align: right;
		text-transform: uppercase;
	}
	.ins-2 {
		text-align: left;
		text-transform: uppercase;
	}
	h2 {
		margin-top: -20px;
	}
	h1 {
		font-size: 3em;
	}
</style>
<body>
	<div class="curtina"></div> 
	<video poster="img/poster.jpg" id="bgvideo" autoplay muted loop>
	<source id=mp4_source src="video/bgvideo2.mp4" type=video/mp4>
	<source id=webm_source src="video/bgvideo2.webm" type=video/webm>
	<source id=ogg_source src="video/bgvideo2.ogv" type=video/ogv>
	Seu navegador não suporta video =(</video>
	<div class="container">
		<div class="row">
			<div class="col-lg-3 ins-1">
				<h5>Quando</h5>
				<h2>25 de Julho a</h2>
				<h2>03 de Agosto</h2>
			</div>
			<div class="col-lg-6">
				<img src="img/logo_logo.png">
			</div>
			<div class="col-lg-3 ins-2">
				<h5>Onde</h5>
				<h2>Flor de Ouro,</h2>
				<h2>Chapada dos Veadeiros</h2>
			</div>
		</div>
		<h1>Obrigado por se inscrever!</h1>
		<h2>Você está a apenas um passo de confirmar sua inscrição. Por favor retorne a página do formulário insira o número de confirmação <b><?php echo $_GET['numero_confirmacao'];?>, e envie o formulário de inscrição.</b></h2>
		<div class="social-icons">
		    <ul>
			    <li><a href="https://www.facebook.com/events/630885240325295" target="_blank" target="_blank"><div class="social-back"><div class="face-ico"></div></div></a></li>
			    <li><a href="http://instagram.com/ficaflordeouro" target="_blank" target="_blank"><div class="social-back"><div class="insta-ico"></div></div></a></li>
		    </ul>
        </div>
	</div>
</body>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script>
	function DayDiff(CurrentDate)
{
    var TYear=CurrentDate.getFullYear();
        var TDay=new Date("July, 25, 2014");
        TDay.getFullYear(TYear);
        var DayCount=(TDay-CurrentDate)/(1000*60*60*24);
        DayCount=Math.round(DayCount); 
    return(DayCount);
};
var Today   = new Date();
var z1 = DayDiff(Today);
document.getElementById('dias').innerHTML += z1;
</script>
</html>