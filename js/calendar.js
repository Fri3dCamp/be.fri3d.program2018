---
layout: 'jsfile'
---
$(document).ready(function() {
    $('#calendar').fullCalendar({
        schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
        customButtons: {
            day1: {
                text: 'Zaterdag',
                click: function(e) {
                    $(".fc-day2-button").removeClass("fc-state-active");
                    $(".fc-day3-button").removeClass("fc-state-active");
                    $(e.target).addClass("fc-state-active");
                    $('#calendar').fullCalendar('getView');
                    $("#calendar").fullCalendar(
                        'changeView', $('#calendar').fullCalendar('getView').name, '2018-08-18'
                        );
                }
            },
            day2: {
                text: 'Zondag',
                click: function(e) {
                    $(".fc-day1-button").removeClass("fc-state-active");
                    $(".fc-day3-button").removeClass("fc-state-active");
                    $(e.target).addClass("fc-state-active");
                    $('#calendar').fullCalendar('getView');
                    $("#calendar").fullCalendar(
                        'changeView', $('#calendar').fullCalendar('getView').name, '2018-08-19'
                        );
                }
            },
            day3: {
                text: 'Maandag',
                click: function(e) {
                    $(".fc-day1-button").removeClass("fc-state-active");
                    $(".fc-day2-button").removeClass("fc-state-active");
                    $(e.target).addClass("fc-state-active");
                    $('#calendar').fullCalendar('getView');
                    $("#calendar").fullCalendar(
                        'changeView', $('#calendar').fullCalendar('getView').name, '2018-08-20'
                        );
                }
            }
        },
        header: {
            left: 'day1,day2,day3',
            center: 'title',
            right: 'agendaDay listDay'
        },
        allDaySlot: true,
        defaultDate: '2018-08-18',
        defaultView: 'agendaDay',
        minTime: '10:00:00',
        maxTime: '23:00:00',
        locale: 'nl-be',
        height: 'auto',
        groupByResource: false,
        buttonIcons: true, // show the prev/next text
        weekNumbers: false,
        navLinks: true, // can click day/week names to navigate views
        editable: false,
        eventLimit: true, // allow "more" link when too many events,
        eventRender: function(event, element) {
            console.log( event );
            element.addClass( 'track-' + event.resourceId );
        },
        events: '{{site.baseurl}}/alltracks.json',
        resources: [
            {
                id: 'main-stage',
                title: 'Main Stage'
            },
            {
                id: 'content',
                title: 'Content'
            },
            { id: 'terrein', title: 'Terrein' },
            { id: 'berkenhof', title: 'Berkenhof' },
            { id: 'hardware-hacking-tent', title: 'Hardware Hacking Tent' },
            { id: 'knutselbaar', title: 'KnutselBaar' },
            { id: 'hoofdgebouw-refter', title: 'Hoofdgebouw Solder Station' },
            { id: 'hoofdgebouw-room-2', title: 'Hoofdgebouw Large LED' },
            { id: 'hoofdgebouw-room-3', title: 'Hoofdgebouw Medium MOSFET' },
            { id: 'hoofdgebouw-room-4', title: 'Hoofdgebouw Tiny Tesseract' },
            { id: 'shelter', title: 'Shelter' },
        ],

        eventAfterAllRender: function() {
            if ( !$(".fc-day2-button").hasClass("fc-state-active") && !$(".fc-day3-button").hasClass("fc-state-active") ) {
                $(".fc-day1-button").addClass("fc-state-active");
            }
        },

        eventClick: function(calEvent, jsEvent, view) {

            $(".calendar-preview .desc").html( he.decode( calEvent.desc ) );
            $(".calendar-preview h2").text( calEvent.title );
            $(".calendar-preview .location a").text( calEvent.location );
            $(".calendar-preview .location a").attr("href","{{site.baseurl}}/locations/"+calEvent.location);
            $(".calendar-preview .type").text(calEvent.type);
            $(".calendar-preview .link").attr("href","{{site.baseurl}}/activities/"+calEvent.name);
            $(".popover-wrapper").show();
            $(".calendar-preview").show();

            $(this).addClass('calevent-selected');

        }
    });

    $(".popover-wrapper").click(function(e) {
        $(".popover-wrapper").hide();

        $(".fc-event").removeClass('calevent-selected');
    });

    $(".popover-wrapper").hide();
    $(".toggletrack").click(function(e) {
        e.preventDefault();
        var trackname = $(this).data('track');
        $(this).toggleClass("visible");
        if ( !$(this).hasClass("visible") ) {
            $("#calendar").fullCalendar('removeEventSource', '{{site.baseurl}}/'+trackname+'.json');
            //console.log($(this).children(".material-icons").text());
            $(this).children(".material-icons").text("visibility_off");
        } else {
            $("#calendar").fullCalendar('addEventSource', {
                url: '{{site.baseurl}}/'+trackname+'.json', // use the `url` property
                //color: 'blue',    // an option!
                className: trackname,
                textColor: 'black' // an option!
            });
            $(this).children(".material-icons").text("visibility");
        }
    });
});
