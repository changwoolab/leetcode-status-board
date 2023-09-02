#!/usr/bin/env node
"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const shelljs_1 = __importDefault(require("shelljs"));
const commander_1 = require("commander");
const utils_1 = require("../utils");
shelljs_1.default.set("-e");
shelljs_1.default.set("-v");
commander_1.program
  .name("Leetcode Status Board")
  .description("Leetcode 문제풀이 현황을 가져와서 보여줍니다.")
  .version("0.1.0")
  .action(() =>
    __awaiter(void 0, void 0, void 0, function* () {
      const currentDay = new Date();
      const lastWeekDay = new Date();
      lastWeekDay.setDate(new Date().getDate() - 7);
      const args = process.argv.slice(2);
      const result = yield Promise.all(
        args.map((leetcodeUsername) =>
          __awaiter(void 0, void 0, void 0, function* () {
            const result = yield (0, utils_1.queryLeetcode)(leetcodeUsername);
            const currentWeeksSolvedProblemsCount = (0,
            utils_1.getUserSolvedProblemCountOnTheWeek)(currentDay, result);
            const lastWeeksSolvedProblemsCount = (0,
            utils_1.getUserSolvedProblemCountOnTheWeek)(lastWeekDay, result);
            return {
              username: leetcodeUsername,
              "이번주에 푼 문제: ": currentWeeksSolvedProblemsCount,
              "저번주에 푼 문제: ": lastWeeksSolvedProblemsCount,
            };
          })
        )
      );
      console.log(JSON.stringify(result, null, 4));
    })
  );
commander_1.program.parse();
