//$ or jQuery both are same
(function(global, $){

	var Greeter = function(firstName, lastName, language){

		return new Greeter.init(firstName, lastName, language);

	}

	Greeter.prototype = {};

	Greeter.init = function(firstName, lastName, language){

		var self = this;
		self.firstName = firstName || " ";
		self.lastName = lastName || " ";
		self.language = language || "English"; 

	}

	Greeter.init.prototype = Greeter.prototype;

	global.Greeter = global.G$ = Greeter;

}(window, $));