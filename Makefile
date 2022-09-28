.PHONY: app
app: node_modules
	next dev

node_modules: package.json yarn.lock
	yarn install --frozen-lockfile