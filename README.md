appreciate me with giving a star to me ☻. (it's at the top-right of this page)

truth be told, actually this was an employment test project I coded for a company called *"sperloos"* but it worth to be on my github since it may help someone else

this simple little cli tool helps you to get climate properties of a month(s)/day(s) in your desired file sourced on accuweather.com

# usage

[you can watch a little tutorial about this here]()

installing with npm:

```
npm i kia-sperloos
```

for instance assume you want to retrieve the property of a day in a file called `output.txt`:

```
# powershell script:
New-Item output.txt
New-Item input.txt
$source = "https://www.accuweather.com/en/gb/london/ec4a-2/daily-weather-forecast/328328?day=1"
Set-Content .\input.txt $source
kia-sperloos set input.json
kia-sperloos get days json .\output.txt
```



**important Notice 1:** the contents of the input file must **only** includes *days links* or *months links*, in other words it **you shouldn't mix days and months links with each other in a file**

**important Notice 2:** use a full screen or maximized shell, otherwise you maybe encounter UI bugs

**important Notice 3:** accuweather.com has no data for passed days, so use this tool for coming days and months

# methods

check if program installed property:

```
kia-sperloos -v
```

get help how to use this tool, it will open the same markdown file you are reading but in `.pdf` format:

```
kia-sperloos help
```

set a file for output (it can be `.txt` or `.json` or whatever you want:

```
kia-sperloos set PATH-OF-URLs-FILE
```

get day(s) in the shell:

```
kia-sperloos get days shell
```

get day(s) in an output file:

```
kia-sperloos get days json .\output.json
```

get month(s) in the shell:

```
kia-sperloos get months shell
```

get month(s) in an output file:

```
kia-sperloos get months json .\output.json
```

