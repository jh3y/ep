MODULES = ./node_modules/.bin
WEBPACK = $(MODULES)/webpack
SERVER  = $(MODULES)/webpack-dev-server
MOCHA   = $(MODULES)/mocha

help:
	@grep -E '^[a-zA-Z\._-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

bundle: ## bundles source
	$(WEBPACK) --progress --colors

dist: ## create dist progrecss
	$(WEBPACK) --progress --colors --optimize-occurence-order --dist

test-bundle: ## bundles test source
	$(WEBPACK) --config webpack.config.test.babel.js --progress --colors

test: test-bundle ## runs tests
	$(MOCHA) test/test.js

develop: ## develop source
	$(SERVER) --progress --colors -d --hot --inline

setup: ## sets up project
	npm install
