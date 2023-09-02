import shell from "shelljs";
import { program } from "commander";
import { getUserSolvedProblemCountOnTheWeek, queryLeetcode } from "./utils";

shell.set("-e");
shell.set("-v");

program
  .name("Leetcode Status Board")
  .description("Leetcode 문제풀이 현황을 가져와서 보여줍니다.")
  .version("0.1.0")
  .action(async () => {
    const currentDay = new Date();
    const lastWeekDay = new Date();
    lastWeekDay.setDate(new Date().getDate() - 7);

    const args = process.argv
      .slice(2)
      .filter((value) => value !== "runLeetcodeStatus")
      .filter((value) => value !== "leetcode-status-board");

    const result = await Promise.all(
      args.map(async (leetcodeUsername) => {
        const result = await queryLeetcode(leetcodeUsername);

        const currentWeeksSolvedProblemsCount =
          getUserSolvedProblemCountOnTheWeek(currentDay, result);

        const lastWeeksSolvedProblemsCount = getUserSolvedProblemCountOnTheWeek(
          lastWeekDay,
          result
        );

        return {
          username: leetcodeUsername,
          "이번주에 푼 문제: ": currentWeeksSolvedProblemsCount,
          "저번주에 푼 문제: ": lastWeeksSolvedProblemsCount,
        };
      })
    );

    console.log(JSON.stringify(result, null, 4));
  });

program.parse();
