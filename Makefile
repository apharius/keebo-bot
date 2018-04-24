all: donglist.txt pokegiflist.txt waifulist.txt

donglist.txt: pictures/dong/
	find pictures/dong -name '*.*' > donglist.txt

pokegiflist.txt: pictures/pokegif/
	find pictures/pokegif -name '*.*' > pokegiflist.txt

waifulist.txt: pictures/waifu/
	find pictures/waifu -name '*.*' > waifulist.txt

clean:
	rm *list.txt
remake: clean all
