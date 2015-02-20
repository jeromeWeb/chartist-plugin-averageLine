/* global Chartist */
(function(window, document, Chartist) {
  'use strict';

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

  Chartist.plugins = Chartist.plugins || {};
  Chartist.plugins.ctAverageLine = function(options) {

    options = Chartist.extend({}, defaultOptions, options);

    return function ctAverageLine(chart) {
      if(chart instanceof Chartist.Line) {
        chart.on('draw', function(data) {
        	if (data.type == "point")
    		{
        		// highlight points equal or over the average
	        	if (options.value !== null && data.value >= options.value)
        		{
	                var element = data.element._node;
	                element.setAttribute('class', element.getAttribute('class') + ' ' + options.highlightPointClass);
        		}

        		// warn zero points 
                if (data.value == 0)
                {
                    var element = data.element._node;
                    element.setAttribute('class', element.getAttribute('class') + ' ' + options.warningPointClass);
                }
    		}
        });

        chart.on('created', function(data) {
            console.log(data);
            
            // Initiate Y axis
            var axisY = new Chartist.LinearScaleAxis(
        	      Chartist.Axis.units.y,
        	      data.chartRect,
        	      function yAxisTransform(projectedValue) {
        	        projectedValue.pos = data.chartRect.y1 - projectedValue.pos;
        	        return projectedValue;
        	      },
        	      {
        	        x: data.options.chartPadding + data.options.axisY.labelOffset.x + (Chartist.Svg.isSupported('Extensibility') ? -10 : 0),
        	        y: data.options.axisY.labelOffset.y + (Chartist.Svg.isSupported('Extensibility') ? -15 : 0)
        	      },
        	      {
        	        highLow: { high: data.bounds.high, low: data.bounds.low },
        	        scaleMinSpace: data.options.axisY.scaleMinSpace
        	      }
        	    );
            
            // Project average value on y axis
            var yavg = data.chartRect.y1 - axisY.projectValue(options.value).pos;

            // Draw label
            data.svg.elem('text', {
                x: data.chartRect.x1 - options.averageCircleXOffset + options.averageLabelOffset.x,
                y: yavg + options.averageLabelOffset.y,
                style: 'text-anchor: ' + options.textAnchor
              }, options.averageLabelClass, true).text(options.value);
            
            // circle label
            data.svg.elem('circle',{
                cx: data.chartRect.x1 - options.averageCircleXOffset,
                cy: yavg,
                r: options.averageCircleRadius
            }, options.averageCircleClass, true);

            // draw average line behind the graph
            data.svg.elem('line',{
            	x1: data.chartRect.x1 - options.averageCircleXOffset,
            	y1: yavg,
            	x2: data.chartRect.x2,
            	y2: yavg
            }, options.averageLineClass, true);
        });
      
      }
    };
  };
}(window, document, Chartist));  