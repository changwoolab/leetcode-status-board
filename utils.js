"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserSolvedProblemCountOnTheWeek = exports.queryLeetcode = exports.getFirstdayAndLastdayOfWeekFromDay = void 0;
const axios_1 = __importDefault(require("axios"));
const getFirstdayAndLastdayOfWeekFromDay = (day) => {
    const copiedDay = new Date(day);
    const first = copiedDay.getDate() - copiedDay.getDay();
    const last = first + 6;
    const firstday = new Date(copiedDay.setDate(first));
    const lastday = new Date(copiedDay.setDate(last));
    return {
        firstday,
        lastday,
    };
};
exports.getFirstdayAndLastdayOfWeekFromDay = getFirstdayAndLastdayOfWeekFromDay;
const queryLeetcode = (username) => __awaiter(void 0, void 0, void 0, function* () {
    return axios_1.default
        .create({
        headers: {
            "Content-Type": "application/json",
        },
    })
        .post("https://leetcode.com/graphql/", {
        query: `{ \n\trecentAcSubmissionList(username: "${username}", limit: 15) {\n\t\ttimestamp\n\t}\n}\n`,
    })
        .then((val) => val.data.data.recentAcSubmissionList);
});
exports.queryLeetcode = queryLeetcode;
(0, exports.queryLeetcode)("changwooyoo01");
const getUserSolvedProblemCountOnTheWeek = (weeksDay, allSolvedProblems) => {
    const { firstday, lastday } = (0, exports.getFirstdayAndLastdayOfWeekFromDay)(weeksDay);
    return allSolvedProblems.filter((problem) => {
        const problemSolvedDay = new Date(Number(problem.timestamp) * 1000);
        if (problemSolvedDay >= firstday && problemSolvedDay <= lastday)
            return true;
        return false;
    }).length;
};
exports.getUserSolvedProblemCountOnTheWeek = getUserSolvedProblemCountOnTheWeek;
