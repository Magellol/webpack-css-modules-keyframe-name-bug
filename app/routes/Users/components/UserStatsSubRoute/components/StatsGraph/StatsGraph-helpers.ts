import { format } from 'date-fns';
import { pipe, pipeWith } from 'pipe-ts';

import { parseDateSafe } from 'helpers/dates';
import { formatISODateStr } from 'helpers/text-formatting';
import * as A from 'shared/facades/array';
import * as O from 'shared/facades/option';
import * as RemoteData from 'shared/facades/remote-data';
import { isDefined } from 'shared/helpers/nullish';

export const getRemoteDataArray = <T>({
  data,
  requiredTotal,
}: {
  data?: T[];
  requiredTotal: number;
}): RemoteData.RemoteData<never, O.Option<T>>[] => {
  if (isDefined(data)) {
    const dataAmount = data.length;
    if (dataAmount >= requiredTotal) {
      return A.takeLeft(requiredTotal)(data).map(pipe(O.some, RemoteData.success));
    } else {
      return [
        ...data.map(pipe(O.some, RemoteData.success)),
        ...A.range(1, requiredTotal - dataAmount).map(() => RemoteData.success(O.none)),
      ];
    }
  } else {
    return A.range(1, requiredTotal).map(() => RemoteData.pending);
  }
};

export const checkIsLoadedAndEmpty = <T>(arr: T[] | undefined) => isDefined(arr) && A.isEmpty(arr);

const monthDateRegex = /^\d{4}-\d{2}$/;

const formatMonthDateStr = (date: string) =>
  pipeWith(
    parseDateSafe(date, 'yyyy-MM', new Date()),
    O.map(parsedDate => format(parsedDate, 'MMMM yyyy')),
  );

export const formatStatsDate = (date: string): string => {
  /**
   * When fetching all-time data, the string will have the format "2015-01". When fetching
   * last-30-days data, this string will be an ISO string.
   */
  const dateStrOption = monthDateRegex.test(date)
    ? formatMonthDateStr(date)
    : formatISODateStr(date);

  return pipeWith(dateStrOption, O.getOrThrow);
};
