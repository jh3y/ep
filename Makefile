MODULES  = ./node_modules/.bin
WEBPACK  = $(MODULES)/webpack
SERVER   = $(MODULES)/webpack-dev-server
MOCHA    = $(MODULES)/mocha
BABEL    = $(MODULES)/babel
UGLIFY   = $(MODULES)/uglifyjs
SASS     = $(MODULES)/node-sass
POSTCSS  = $(MODULES)/postcss
CLEANCSS = $(MODULES)/cleancss
ESLINT   = $(MODULES)/eslint
SASSLINT = $(MODULES)/sass-lint
GHPAGES  = $(MODULES)/gh-pages

DEST = dist
FILE_NAME = ep
SCRIPT_SRC = src/script/index.js
STYLE_SRC = src/styles/ep.scss

UGLIFY_OPTS = --compress --comments --mangle -o $(DEST)/$(FILE_NAME).min.js $(DEST)/$(FILE_NAME).js
CLEANCSS_OPTS = --s1 -o $(DEST)/$(FILE_NAME).min.css $(DEST)/$(FILE_NAME).css
POSTCSS_OPTS = --use autoprefixer -d $(DEST)/ $(DEST)/*.css

help:
	@grep -E '^[a-zA-Z\._-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

bundle: ## bundles source
	$(WEBPACK) --progress --colors

deploy: ## create deployment bundle
	rm -rf public && $(WEBPACK) --progress --colors -p --deploy && $(GHPAGES) -d public

# NOTE:: Introduce when tests are created
# test-bundle: ## bundles test source
# 	$(WEBPACK) --config webpack.config.test.babel.js --progress --colors

# test: test-bundle ## runs tests
# 	$(MOCHA) test/test.js

test: ## runs tests, linting
	make lint

develop: ## develop source
	$(SERVER) --progress --colors -d --hot --inline

setup: ## sets up project
	npm install

dist-style: ## compiles styles for dist
	mkdir -pv $(DEST) && $(SASS) $(STYLE_SRC) $(DEST)/$(FILE_NAME).css && $(POSTCSS) $(POSTCSS_OPTS) && $(CLEANCSS) $(CLEANCSS_OPTS)

dist-script: ## compiles script for dist
	mkdir -pv $(DEST) && $(BABEL) $(SCRIPT_SRC) -o $(DEST)/$(FILE_NAME).js && $(UGLIFY) $(UGLIFY_OPTS)

clean: ## removes directories
	rm -rf $(DEST) public

dist: clean ## create dist scripts
	rm -rf $(DEST) && mkdir -pv $(DEST) && make dist-script && make dist-style

lint-scripts: ## lints ep script
	$(ESLINT) $(SCRIPT_SRC)

lint-styles: ## lints ep stylesheet
	$(SASSLINT) --verbose

lint: ## lints source
	make lint-styles && make lint-scripts
