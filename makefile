.PHONY: copy-site remove-site


SITE = /var/www/tatyana.gagauz.ru


copy-site: remove-site
	mkdir $(SITE)
	cp --parents `git ls-files` $(SITE)


remove-site:
	-rm -rf $(SITE)
