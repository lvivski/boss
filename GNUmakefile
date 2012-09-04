build:
	@mkdir -p lib/{boss,css}
	@node_modules/.bin/ometajs2js -b -i src/boss/parser.ometajs > lib/boss/parser.js
	@node_modules/.bin/ometajs2js -b -i src/boss/transformer.ometajs > lib/boss/transformer.js
	@node_modules/.bin/ometajs2js -b -i src/boss/translator.ometajs > lib/boss/translator.js

	@node_modules/.bin/ometajs2js -b -i src/css/parser.ometajs > lib/css/parser.js
	@node_modules/.bin/ometajs2js -b -i src/css/transformer.ometajs > lib/css/transformer.js
	@node_modules/.bin/ometajs2js -b -i src/css/translator.ometajs > lib/css/translator.js
