/**
 * @jest-environment jsdom
 */
import "../../../__mocks__/index";

import {HandlebarsHelpers} from "./handlebars-helpers";
import {CalManager, updateCalManager} from "../index";
import CalendarManager from "../calendar/calendar-manager";
import Calendar from "../calendar";
import DateSelectorManager from "../date-selector/date-selector-manager";
import Renderer from "../renderer";
import * as VUtils from "../utilities/visual";
import SCController from "../s-c-controller";


describe('Handlebars Helpers Tests', () => {
    let tCal: Calendar;

    beforeEach(() => {
        updateCalManager(new CalendarManager());
        tCal = new Calendar('','');
        jest.spyOn(CalManager, 'getActiveCalendar').mockImplementation(() => {return tCal;});
    });

    test('Register', () => {
        HandlebarsHelpers.Register();
        expect(Handlebars.registerHelper).toHaveBeenCalledTimes(4);
    });

    test('Date Selector', () => {
        //@ts-ignore
        jest.spyOn(DateSelectorManager, 'GetSelector').mockImplementation(() => {return {build: () => {return '';}};});
        const options: any = {hash:{}};
        expect(HandlebarsHelpers.DateSelector(options)).toBe('');
        options.hash['id'] = 'test';
        expect(HandlebarsHelpers.DateSelector(options)).toBeDefined();
        expect(DateSelectorManager.GetSelector).toHaveBeenCalledTimes(1);

        options.hash = {
            id: 'a',
            allowDateRangeSelection: true,
            allowTimeRangeSelection: true,
            calendar: '',
            editYear: false,
            onDateSelect: () => {},
            position: {top:0, left:0},
            showCalendarYear: true,
            showDateSelector: true,
            selectedEndDate: {},
            timeSelected: false,
            selectedStartDate: {},
            showTimeSelector: true,
            timeDelimiter: '-',
            useCloneCalendars: false
        };
        expect(HandlebarsHelpers.DateSelector(options)).toBeDefined();
        expect(DateSelectorManager.GetSelector).toHaveBeenCalledTimes(2);
    });

    test('Full Calendar', () => {
        jest.spyOn(Renderer.CalendarFull, 'Render').mockImplementation(() => {return '';});
        jest.spyOn(SCController, 'LoadThemeCSS').mockImplementation(() => {});
        const options: any = {hash:{}};
        expect(HandlebarsHelpers.FullCalendar(options)).toEqual({"v": ""});

        options.hash = {
            allowChangeMonth: true,
            colorToMatchSeason: true,
            cssClasses: '',
            date: {},
            editYear: true,
            id:'',
            calendarId: '',
            showCurrentDate: true,
            showSeasonName: true,
            showNoteCount: true,
            showMoonPhases: true,
            showYear: true,
            theme: 'light'
        };
        expect(HandlebarsHelpers.FullCalendar(options)).toBeDefined();
        expect(SCController.LoadThemeCSS).toHaveBeenCalledTimes(1);
    });

    test('Clock', () => {
        jest.spyOn(Renderer.Clock, 'Render').mockImplementation(() => {return '';});
        jest.spyOn(SCController, 'LoadThemeCSS').mockImplementation(() => {});
        const options: any = {hash:{}};
        expect(HandlebarsHelpers.Clock(options)).toEqual({"v": ""});

        options.hash = {
            id: '',
            calendarId: '',
            theme: 'light'
        };
        expect(HandlebarsHelpers.Clock(options)).toEqual({"v": ""});
        expect(SCController.LoadThemeCSS).toHaveBeenCalledTimes(1);
    });

    test('Icon', () => {
        jest.spyOn(VUtils, 'GetIcon').mockImplementation(() => {return '';});
        const options: any = {hash:{}};
        expect(HandlebarsHelpers.Icon(options)).toEqual('');

        options.hash = {
            name: ''
        };
        expect(HandlebarsHelpers.Icon(options)).toEqual({"v": ""});

        options.hash = {
            name: '',
            stroke: '',
            fill: ''
        };
        expect(HandlebarsHelpers.Icon(options)).toEqual({"v": ""});
    });
});