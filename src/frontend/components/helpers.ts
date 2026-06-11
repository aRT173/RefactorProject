type BackendOption = Record<string, string | number>;

export type BackendGroup = Record<string, string | BackendOption[]>;

type Opt = {
  groupLabelKey: string;
  groupOptionsKey: string;
  optionValueKey: string;
  optionLabelKey: string;
  optionSortKey?: string;
}

export const mapSelectGroup = (groups: BackendGroup[], opt: Opt) =>
  groups.map((group) => {
    const options = group[opt.groupOptionsKey];

    return {
      label: String(group[opt.groupLabelKey]),
      options: (Array.isArray(options) ? [...options] : [])
        .sort((a, b) => {
          if (!opt.optionSortKey) {
            return 0;
          }

          return Number(a[opt.optionSortKey]) - Number(b[opt.optionSortKey]);
        })
        .map((option) => ({
          value: option[opt.optionValueKey],
          label: String(option[opt.optionLabelKey]),
        })),
    };
  });
