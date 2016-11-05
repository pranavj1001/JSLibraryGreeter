//$ or jQuery both are same
(function(global, $){

	var Greeter = function(firstName, lastName, language){
		return new Greeter.init(firstName, lastName, language);
	}

	var supportLanguages = ['English', 'Spanish'];

	var greetings = {
		English: 'Hello',
		Spanish: 'Hola'
	};

	var formalGreetings = {
		English: 'Greetings',
		Spanish: 'Saludos'
	};

	var logMessages = {
		English: 'Logged In',
		Spanish: 'Inició Sessión'
	};

	Greeter.prototype = {//used  object literal here

		fullName: function(){
			return this.firstName + ' ' + this.lastName;
		},

		validate: function(){
			if(supportLanguages.indexOf(this.language) == -1){
				throw " Invalid language";
			}
		},

		greeting: function(){
			return greetings[this.language] + ' ' + this.firstName + '!';
		},

		formalGreeting: function(){
			return formalGreetings[this.language] + ', ' + this.fullName(); 
		},

		greet: function(formal){
			var msg;

			//if undefined or null it will be coerced to 'false'
			if(formal){
				msg = this.formalGreeting();
			}else{
				msg = this.greeting();
			}

			if(console){
				console.log(msg);
			}

			//'this' refers to the calling object at execution time, makes the method chainable

			return this;

		},

		log: function(){

			if(console){//if console is undefined then 'undefined' will be coerced into 'false' (problem with IE)
				console.log(logMessages[this.language] + ': ' + this.fullName());
			}
			return this;

		},

		setLang: function(lang){

			this.language = lang;
			this.validate();
			return this;

		}

	};

	Greeter.init = function(firstName, lastName, language){

		var self = this;
		self.firstName = firstName || " ";
		self.lastName = lastName || " ";
		self.language = language || "English"; 

	}

	Greeter.init.prototype = Greeter.prototype;

	global.Greeter = global.G$ = Greeter;

}(window, $));