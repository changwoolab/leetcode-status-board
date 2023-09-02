import axios, { AxiosResponse } from "axios";

export const getFirstdayAndLastdayOfWeekFromDay = (day: Date) => {
  const copiedDay = new Date(day);
  const first = copiedDay.getDate() - copiedDay.getDay();
  const last = first + 6;

  const firstday = new Date(copiedDay.setDate(first));
  firstday.setHours(0);
  firstday.setMinutes(0);
  firstday.setSeconds(0);
  const lastday = new Date(copiedDay.setDate(last));
  lastday.setHours(23);
  lastday.setMinutes(59);
  lastday.setSeconds(59);

  return {
    firstday,
    lastday,
  };
};

export const queryLeetcode = async (username: string) => {
  return axios
    .create({
      headers: {
        "Content-Type": "application/json",
      },
    })
    .post<
      AxiosResponse<{
        recentAcSubmissionList: {
          timestamp: string;
        }[];
      }>
    >("https://leetcode.com/graphql/", {
      query: `{ \n\trecentAcSubmissionList(username: "${username}", limit: 15) {\n\t\ttimestamp\n\t}\n}\n`,
    })
    .then((val) => val.data.data.recentAcSubmissionList);
};

export const getUserSolvedProblemCountOnTheWeek = (
  weeksDay: Date,
  allSolvedProblems: { timestamp: string }[]
) => {
  const { firstday, lastday } = getFirstdayAndLastdayOfWeekFromDay(weeksDay);
  return allSolvedProblems.filter((problem) => {
    const problemSolvedDay = new Date(Number(problem.timestamp) * 1000);
    if (problemSolvedDay >= firstday && problemSolvedDay <= lastday)
      return true;
    return false;
  }).length;
};
