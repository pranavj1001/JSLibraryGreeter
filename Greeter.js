//$ or jQuery both are same
(function(global, $){

	// 'new' an object
	var Greeter = function(firstName, lastName, language){
		return new Greeter.init(firstName, lastName, language);
	}

	/*
	languages which are currently supported
	en - English
	es - Spanish
	*/
	//hidden with the scope of the IIFE and never directly accessible
	var supportLanguages = ['en', 'es', 'fr', 'ge'];

	//informal greetings
	var greetings = {
		en: 'Hello',
		es: 'Hola',
		fr: 'Allo',
		ge: 'Hallo'
	};

	//formal greetings
	var formalGreetings = {
		en: 'Greetings',
		es: 'Saludos',
		fr: 'Bonjour',
		ge: 'Servus'
	};

	//log Messages
	var logMessages = {
		en: 'Logged In',
		es: 'Inició Sessión',
		fr: 'Connecté',
		ge: 'Eingeloggt'
	};

	//prototype holds methods (to save memory space)
	Greeter.prototype = {//used  object literal here

		//'this' refers to the calling object at execution time
		fullName: function(){
			return this.firstName + ' ' + this.lastName;
		},

		//used to check whether the language is supported by the library or not
		validate: function(){
			if(supportLanguages.indexOf(this.language) == -1){
				throw "Invalid language";
			}
		},

		//will return informal greeting
		greeting: function(){
			return greetings[this.language] + ' ' + this.firstName + '!';
		},

		//will return formal greeting
		formalGreeting: function(){
			return formalGreetings[this.language] + ', ' + this.fullName(); 
		},

		//chainable methods return their own containing object
		greet: function(formal){

			var msg;
			msg = this.prepareTheGreeting(formal);
			console.log(msg);

			//'this' refers to the calling object at execution time, makes the method chainable
			return this;

		},

		//to log the lang and name to the console for developers
		log: function(){

			if(console){//if console is undefined then 'undefined' will be coerced into 'false' (problem with IE)
				console.log(logMessages[this.language] + ': ' + this.fullName());
			}
			return this;

		},

		//used to set the language
		setLang: function(lang){

			this.language = lang;
			this.validate();
			return this;

		},

		//used to create the greeting which will be displayed for the user on the html
		HTMLGreeting: function(selector, formal){
			if(!$){
				throw "jQuery not loaded";
			}

			if(!selector){
				throw "Missing selector";
			}

			var msg;
			msg = this.prepareTheGreeting(formal);

			$(selector).html(msg);

			return this;
		},

		//it is basically the common code which is used by the functions above
		//it prepares the Greeting and returns it 
		prepareTheGreeting: function(formal){
			var msg;

			//if undefined or null it will be coerced to 'false'
			//this will determine which greeting should be created
			if(formal){
				msg = this.formalGreeting();
			}else{
				msg = this.greeting();
			}
			return msg;
		}

	};

	//the actual object is created here, allowing us to 'new' an object without calling 'new'
	Greeter.init = function(firstName, lastName, language){

		var self = this;
		self.firstName = firstName || " ";
		self.lastName = lastName || " ";
		self.language = language || "en";

		self.validate(); 
		
	}

	//trick borrowed from jQuery so we don't have to use the 'new' keyword
	Greeter.init.prototype = Greeter.prototype;

	//attach this Greeter to the global object, and provide a shortCut (G$)
	global.Greeter = global.G$ = Greeter;

}(window, $));