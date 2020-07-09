(function ($) {
    'use strict';
    
    var $container,
      	$apcal,
      	$apcalHeader,
      	$apcalBody;

    function createAPcalHeader() {
		var arrV2 = [  'testName1', 'testName2', 'testName3'];

		var $apcalHeader = $('<div class="outer">');

		$apcalHeader.appendTo('<table></table>'); 
		$.each(arrV2, function(index, value) {
			$('table').appendTo('<tr><td>' + value + '</td><td>column1</td><td>column2</td><td>column3</td><td>column4</td></tr>');
		});
		
		return $apcalHeader;
    }
    

    function createHcalBody(format) {
      var $body = $('<div class="hcal-body" style="margin-top:131px;">'),
        i = 0,
        $row,
        $time,
        $hr,
        timevalue;
      
      //for (i = 0; i < 25; i = i + 1) {
      for (i = 8; i < 25; i = i + 1) {
        timevalue = format === 'ger' ? i + ':00' : (i % 12) + (i < 12 ? 'am' : 'pm');
        if (format !== 'ger') {
          // Fix US values
          timevalue = i === 0 ? '12am' : timevalue;
          timevalue = i === 12 ? '12pm' : timevalue;
          timevalue = i === 24 ? '12am' : timevalue;
        }
        $row = $('<div class="hcal-body-row ap-add-calendar" data-hora="'+i+'">').appendTo($body);
        $time = $('<div class="hcal-body-row-time">').text(timevalue).appendTo($row);
        $hr = $('<div class="hcal-body-row-hr">').appendTo($row);
      }
      
      return $body;
    }
    

    function init(el) {
      	$container = el;
		$apcal = $('<div class="ap_calendar">');
      
      	$apcalHeader = createAPcalHeader().appendTo($apcal);
      	// $hcalBody = createHcalBody(format).appendTo($hcal);
      
      	$apcal.appendTo($container);
    }
    

    $.fn.addHcalAppointment = function (position, duration, title, place, desc, color, ID) {
      var $row = $hcalBody.children('.hcal-body-row:nth-child(' + (position - 7) + ')'),
        $item = $('<div class="hcal-body-row-item">'),
        $headline = $('<h3 class="hcal-body-row-item-headline">').appendTo($item),
        $desc = $('<div class="hcal-body-row-item-text">').text(desc).appendTo($item),
        rgbaStringFull,
        rgbaStringTransparent;
      
      // Set headline and place
      $headline.html(title + '<span class="hcal-item-nr"> | ' + place + '</span>');
      
      // Set duration
      $item.addClass('hcal-duration-' + duration + 'h');
      $item.addClass('ap-calendar');
      $item.attr("data-id", ID);
      
      // Set color
      if (Object.prototype.toString.call(color) === '[object Array]') {
        rgbaStringFull = 'rgba(' + color[0] + ', ' + color[1] + ', ' + color[2] + ', 1)';
        rgbaStringTransparent = 'rgba(' + color[0] + ', ' + color[1] + ', ' + color[2] + ', 0.7)';
        $item.css({
          'background': rgbaStringTransparent,
          'border-left': '2px solid ' + rgbaStringFull
        });
      } else {
        $item.addClass('hcal-body-item-color0' + color);
      }
      
      $item.prependTo($row);
      $item.parent().removeClass("ap-add-calendar");
      
      return this;
    };
  
    $.fn.ap_cal = function () {
      	init(this);
      	return this;
    };
  
  }(jQuery));