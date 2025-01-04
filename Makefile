# Makefile

.PHONY: install publish gendiff lint test

install: # Установка зависимостей
	npm ci

publish:
	npm publish --dry-run

gendiff: # Запуск приложения
	node bin/gendiff.js

lint: # Запуск линтера
	npx eslint .

test:
	npm test
