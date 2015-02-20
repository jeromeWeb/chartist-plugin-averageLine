# chartist-plugin-barhighlight
Average Line for Chartist.js

# Highlight Bars for Chartist.js 
This is a plugin for Chartist.js that will draw an average line behind the graph and highlight points over the limit on line charts.

## Available options and their defaults values

```javascript
var defaultOptions = {
  value: null,
  averageCircleRadius: 11,
  averageCircleClass: 'ct-circle-average',
  averageCircleXOffset: 30,
  averageLabelClass: 'ct-label-average',
  averageLabelOffset: {
    x: 0,
    y: 0
  },
  averageLineClass: 'ct-line-average',
  highlightPointClass: 'ct-point-highlight',
  warningPointClass: 'ct-point-warning',
  textAnchor: 'middle'
};
```

## Sample usage in Chartist.js

```javascript
var chart = new Chartist.Line('.ct-chart', {
  labels: [1, 2, 3, 4, 5, 6, 7],
  series: [
    [2, 4, 2, 5, 4, 3, 6]
  ]
}, {
  plugins: [
    Chartist.plugins.ctAverageLine({
      value: 6
    })
  ]
});
```

