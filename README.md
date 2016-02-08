# -ach, -ingen, -zell
A visual exploration of the spatial patterns in the endings of German town and village names.

See the live version at [http://truth-and-beauty.net/experiments/ach-ingen-zell](http://truth-and-beauty.net/experiments/ach-ingen-zell)

I picked the most interesting suffixes from [https://de.wikipedia.org/wiki/Ortsname](https://de.wikipedia.org/wiki/Ortsname) and cross-referenced them with a list of place names from [geonames](http://www.geonames.org/export/). Please note that the approach is fairly naive: I don’t test for syllables but only match the string ending (i.e. -ach matches Kirchbach).

Yet, it's a dataset I always found interesting to explore and some of the maps are already quite interesting; plus, this quick experiment gave me the opportunity to play a bit with a few new tools and libraries I wanted to learn more about.

# Usage
Run
```
npm install
```
to install all required node.js packages

Run
```
npm run dev
```
to build a development version and serve it from [http://localhost:8080/](http://localhost:8080/)

Run
```
npm run deploy
```
to build a deployment version into the build directory, which can be uploaded to a normal web server, no server side scripts or settings re required to run the application.

# Remixes and adaptations
- [Slovenian adaptation](http://virostatiq.com/dnevnik/suffix-suffer/#)
- [Romanian version](https://static.l3vi.de/esti-ov-oara/)
- [-tation](http://darthmall.github.io/-tation/) (Antarctica version!)
- [US version](http://virostatiq.com/data-visualizations/us-suffix-density/)
- [Belarus version](http://trafimovi.ch/city-and-village-names/)
- [Czech version](https://devel.finwe.info/ova-ska-ice/)
- [Interactive version on OSM data, various countries](http://bgrsquared.com/places/)
- [Switzerland/Interactive version in datablog](http://blog.tagesanzeiger.ch/datenblog/index.php/11390/die-haeufigsten-ortsnamensendungen-in-der-schweiz)
- [Remix using R](http://rud.is/b/2016/01/03/zellingenach-a-visual-exploration-of-the-spatial-patterns-in-the-endings-of-german-town-and-village-names-in-r/)
- [Dutch version, based on above R remix](http://www.brabantsewijnbouwers.nl/uvh/NLtoponiemen.html)

# Tools used

## csvkit
- To make the original [csv file](http://download.geonames.org/export/dump/) more manageable and compact, I added some [headers](https://raw.githubusercontent.com/MoritzStefaner/ach-ingen-zell/master/src/data/headers.tsv) to the file (based on the [readme.txt](http://download.geonames.org/export/dump/readme.txt). I then proceeded to filter the data to include only the place types and columns I need with the useful [csvkit](http://download.geonames.org/export/dump/readme.txt) utility, like this:

```
in2csv DE.txt --format csv -d \t |  csvgrep -c feature_class -m "P" | csvcut -c name,latitude,longitude > placenames_de.tsv
```

This sequence of commands
* reads the csv file
* filters for all rows with a “P” as “feature_class”
* keeps only the columns name, latitude and longitude
* and stores the result in “placenames_de.tsv”

## webpack
This is my first project using [webpack](http://webpack.github.io) as a build tool, so if you have any ideas on how to improve, let me know.

## ES2015
This project uses [babel](https://babeljs.io/) to compile [ES2015](https://babeljs.io/docs/learn-es2015/) (the first step towards a revamped JavaScript). While I really enjoy [coffeescript](http://coffeescript.org)’s conciseness, ES2015 seems to provide a saner foundation for larger projects.

## d3 with hexbin plugin
I use the new modularized version of [d3](http://d3js.org/) with  the wonderful new [color scales](https://www.npmjs.com/package/d3-scale#sequential-color-scales) and the lovely [h3-hexbin plugin](https://www.npmjs.com/package/d3-hexbin/) which made it a breeze to create the hexmaps.

## React
[React](https://facebook.github.io/react/) provides a clean and efficient way to structure and render web applications. As demonstrated in this small example, it can even replace d3 as an SVG rendering tool. React is pretty great in rendering complex nested DOM trees or UIs, but it seems a bit harder to develop very fluid, animated interfaces.

The ways d3 and react handle interaction and animation are quite different, so, basically, one has to decide who is in the driver’s seat:
* In case of react, you will use d3 only for the scales, utilities, layouts, … but not the d3 event handlers or enter-update-exit lifecycle   (as done in this example).
* Alternatively, you can use react only to render the container and static parts of the data visualization, and use normal d3 approaches to fill them with dynamic content in the componentDidMount/componentDidUpdate handlers.
(However, then you lose a lot of the benefits coming with react.)

## JS Modules
Along with ES2015 comes a clearly defined way to specify internal and external script dependencies. For instance, the once monolithic d3 library is currently being [split up into modules](https://github.com/mbostock/d3/issues/2461), which allows to install independent parts of the library using e.g. [npm](https://www.npmjs.com) and declare a dependency on them in your scripts (e.g. ```import d3_scale from 'd3-scale’;```). Webpack will pick these dependencies up and bundle all (and only) the required code into your script.

## Feedback
This was just a quick experiment and excursion of mine into a few techniques I wanted to explore. I hope some of these are interesting to you, too — [let me know](https://github.com/MoritzStefaner/ach-ingen-zell/issues/1) if you have any thoughts or questions!


