$(document).ready(function() {
	//fancy


	var start, end;
	// => false
	$('#calendar').fullCalendar({
		header: {
			left: '',
			center: 'title',
			right: ''
		},
		columnFormat: {
			week: 'ddd' //week: 'ddd M/D'
		},
		defaultView: 'agendaWeek',
		defaultDate: '2014-09-12',
		axisFormat: 'H(:mm)',
		allDaySlot: false,
		firstDay: 1,
		selectable: true,
		selectHelper: true,
		slotDuration: '01:00:00',
		editable: true,
		// slotEventOverlap: false,
		eventLimit: {
			'agenda': 6, // adjust to 6 only for agendaWeek/agendaDay
			'default': 1, // give the default value to other views'
			'week': 1
		},
		select: function(start, end) {
			var	eventData = {
					id: Math.random().toString(36).substr(2, 9),
					title: '0',
					start: start,
					end: end
				};
			$('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
			$('#calendar').fullCalendar('unselect');
			

			$("#price").val(eventData.title);
			$("#week_start").val(moment(start).format('YYYY[-]MM[-]DD'));
			$("#week_end").val(moment(end).format('YYYY[-]MM[-]DD'));
			$("#time_start").val(moment(start).format('HH:mm:ss'));
			$("#time_end").val(moment(end).format('HH:mm:ss'));
			
		},
		eventClick: function(event, element) {
			//for schedule
			$.fancybox( {
				href : '#dialog',
				beforeLoad: function(){
					$("#btn_delete, #btn_update").show();
					$("#btn_add, #duraion_lable").hide();
					// $('select').attr('disabled','disabled')
				},
				afterLoad: function(){
					$("#title").text("Edit")
				}
			} );
			//display
			var event_title = event.title;
			var event_start = moment(event.start);
			var event_end = moment(event.end);

			var event_start_week = event_start.format('YYYY[-]MM[-]DD');
			var event_end_week = event_end.format('YYYY[-]MM[-]DD');
			var event_start_time = event_start.format('HH:mm:ss');
			var event_end_time = event_end.format('HH:mm:ss');


			//showDialogVal(event_title, event_start_week, event_end_time, event_start_week, event_end_week)
			$("#price").val(event_title);
			$("#time_start").val(event_start_time);
			$("#time_end").val(event_end_time);
			$("#week_start").val(event_start_week);
			$("#week_end").val(event_end_week);

			//delete
			$('#btn_delete').click(function() {
				$('#calendar').fullCalendar('removeEvents', [event.id])
				return false;
			})

			//update
			$('#btn_update').click(function() {
				event.title = $("#price").val();
				event.start = $("#week_start").val() + 'T' + $("#time_start").val();
				event.end = $("#week_end").val() + 'T' + $("#time_end").val();
				//console.log(moment($("#week_start").val()).format()+'  ');
				$('#calendar').fullCalendar('updateEvent', event);
				return false;
			})


			//$('#calendar').fullCalendar('updateEvent', event);
			//$('#calendar').fullCalendar( 'removeEvents', [ 999 ] )
		},
		
		timeFormat: {
			agenda: 'H:mm',
		},
		events: [{
				id: 111,
				title: 'Hannah Event',
				start: '2014-09-11T16:00:00',
				end: '2014-09-11T23:00:00'
			}, {
				id: 44,
				title: 'Conference',
				start: '2014-09-13T10:00:00',
				end: '2014-09-13T22:00:00'
			},

		],

	});

	//dialog show value
	function showDialogVal(price, week_start, week_end, time_start, time_end){
		$("#price").val(price);
		$("#week_start").val(week_start);
		$("#week_end").val(week_end);
		$("#time_start").val(time_start);
		$("#time_end").val(time_end);
	}

	$("#dailog_form").submit(function() {


		if ($("#duraion").prop('checked')) {
			//for(var i=)
			var oneDay = 60 * 60 * 24 * 1000;
			var startTime = moment($("#week_start").val() + 'T' + $("#time_start").val());
			var startEndTime = moment($("#week_start").val() + 'T' + $("#time_end").val());
			var endTime = moment($("#week_end").val() + 'T' + $("#time_end").val());

			var x = 0,
				eventData = [],
				eventDataObj;
			//console.log(startTime + '  '+ oneDay);
			for (var i = startTime; i <= endTime; i += oneDay) {
				eventDataObj = {
					id: Math.random().toString(36).substr(2, 9),
					title: $("#price").val(),
					start: moment(startTime).add(x, 'days').format(),
					end: moment(startEndTime).add(x, 'days').format()
				}

				x++;
				eventData.push(eventDataObj)

			}

			$('#calendar').fullCalendar('addEventSource', eventData);
		} else {
			eventData = [{
				title: $("#price").val(),
				start: $("#week_start").val() + 'T' + $("#time_start").val(),
				end: $("#week_end").val() + 'T' + $("#time_end").val()
			}];
			// $('#calendar').fullCalendar('addEventSource', eventData);
			$('#calendar').fullCalendar('renderEvent', eventData, true);



		}
		return false;
	})


	var view = $('#calendar').fullCalendar('getView');

	var option_week_start, option_time_start = "",
		option_week, option_time;
	for (i = 0; i < 7; i++) {
		option_week = moment(view.start).add(i, 'days');
		option_week_start += "<option value=" + option_week.format('YYYY-MM-DD') + ">" + option_week.format('ddd') + "</option>";
	}
	for (i = 0; i < 24; i++) {
		option_time = moment(view.start).add('hours', i).format('HH:mm:ss');
		option_time_start += "<option value=" + option_time + ">" + option_time + "</option>";
	}

	$("#week_start, #week_end").append(option_week_start);
	$("#time_start, #time_end").append(option_time_start);
});