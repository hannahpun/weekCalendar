$(document).ready(function() {
	//fancy


	var start, end, eventData;
	var x, eventDataArr,eventDataObj;
	

	//fullCalendar setting
	$('#calendar').fullCalendar({
		header: {
			left: '',
			center: '',
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
		slotDuration: '01:00:00',
		editable: true,
		select: function(start, end) {

			//save event 
			eventData = {
				id: Math.random().toString(36).substr(2, 9),
				start: start,
				end: end
			};
			$('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
			$('#calendar').fullCalendar('unselect');
			
			//dialog show value
			$("#week_start").val(moment(start).format('YYYY[-]MM[-]DD'));
			$("#week_end").val(moment(end).format('YYYY[-]MM[-]DD'));
			$("#time_start").val(moment(start).format('HH:mm:ss'));
			$("#time_end").val(moment(end).format('HH:mm:ss'));

			//fancybox show
			$.fancybox( {
				href : '#dialog',
				beforeLoad: function(){
					$("#btn_delete, #btn_update").hide();
					$("#btn_add, #duraion_lable").show();
				},
				afterLoad: function(){
					$("#title").text("Add")
				}
			} );
			
		},
		eventClick: function(event, element) {
			//fancybox
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

			//dialog show value
			$("#price").val(event.title);
			$("#time_start").val(moment(event.start).format('HH:mm:ss'));
			$("#time_end").val(moment(event.end).format('HH:mm:ss'));
			$("#week_start").val(moment(event.start).format('YYYY[-]MM[-]DD'));
			$("#week_end").val(moment(event.end).format('YYYY[-]MM[-]DD'));

			//delete
			$('#btn_delete').click(function() {
				$('#calendar').fullCalendar('removeEvents', [event.id])
				$.fancybox.close(true);
				return false;
			})

			//update
			$('#btn_update').click(function() {
				event.title = $("#price").val();
				event.start = $("#week_start").val() + 'T' + $("#time_start").val();
				event.end = $("#week_end").val() + 'T' + $("#time_end").val();
				$('#calendar').fullCalendar('updateEvent', event);
				$.fancybox.close(true);
				return false;
			})
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

	
	//add
	$('#btn_add').click(function() {
		addEvent(eventData);
		return false;
	})

	function addEvent(eventData){
		//先刪掉原本的
		$('#calendar').fullCalendar('removeEvents', eventData.id)

		//$.fancybox.close(true);
		console.log($("#duraion").prop('checked'))
		if ($("#duraion").prop('checked')) {

			var oneDay = 60 * 60 * 24 * 1000;
			var startTime = moment($("#week_start").val() + 'T' + $("#time_start").val());
			var startEndTime = moment($("#week_start").val() + 'T' + $("#time_end").val());
			var endTime = moment($("#week_end").val() + 'T' + $("#time_end").val());

			x = 0,
			eventDataArr = [],
			eventDataObj = {};

			for (var i = startTime; i <= endTime; i += oneDay) {
				eventDataObj = {
					id: Math.random().toString(36).substr(2, 9),
					title: $("#price").val(),
					start: moment(startTime).add(x, 'days').format(),
					end: moment(startEndTime).add(x, 'days').format()
				}

				x++;
				eventDataArr.push(eventDataObj)

			}
			//save event
			$('#calendar').fullCalendar('addEventSource', eventDataArr);

		} else {
			
			//change event
			eventData.id = Math.random().toString(36).substr(2, 9);
			eventData.title = $("#price").val();
			eventData.start = $("#week_start").val() + 'T' + $("#time_start").val();
			eventData.end = $("#week_end").val() + 'T' + $("#time_end").val();
			
			//save event
			$('#calendar').fullCalendar('renderEvent', eventData, true);

		}
	}

	//initial
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