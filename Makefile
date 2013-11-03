.PHONY: doc update_doc publish_doc
doc:
	yuidoc --config config/yuidoc.json

.doc:
	git clone .git .doc
	cd .doc && git remote set-url origin $(shell git remote -v | grep -m1 origin | cut -f2 | cut -d\  -f1)
	cd .doc && git fetch && git checkout -t origin/gh-pages

update_doc: doc .doc
	cd .doc && git fetch && git reset --hard HEAD@{upstream}
	rm -rf .doc/*
	cp -r doc/* .doc/
	cd .doc && git add . && git commit -m'Doc update.'

publish_doc: update_doc
	cd .doc && git push origin gh-pages
