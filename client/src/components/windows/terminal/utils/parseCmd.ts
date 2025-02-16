// Credits:
// https://stackoverflow.com/a/39304272

export const parseCmd = (cmdline: string) => {
  const re_next_arg = /^\s*((?:(?:"(?:\\.|[^"])*")|(?:'[^']*')|\\.|\S)+)\s*(.*)$/;

  let next_arg = ["", "", cmdline];
  const args = [];

  while ((next_arg = re_next_arg.exec(next_arg[2]) as string[])) {
    let quoted_arg = next_arg[1];
    let unquoted_arg = "";
    while (quoted_arg.length > 0) {
      if (/^"/.test(quoted_arg)) {
        const quoted_part = /^"((?:\\.|[^"])*)"(.*)$/.exec(quoted_arg) as string[];
        unquoted_arg += quoted_part[1].replace(/\\(.)/g, "$1");
        quoted_arg = quoted_part[2];
      } else if (/^'/.test(quoted_arg)) {
        const quoted_part = /^'([^']*)'(.*)$/.exec(quoted_arg) as string[];
        unquoted_arg += quoted_part[1];
        quoted_arg = quoted_part[2];
      } else if (/^\\/.test(quoted_arg)) {
        unquoted_arg += quoted_arg[1];
        quoted_arg = quoted_arg.substring(2);
      } else {
        unquoted_arg += quoted_arg[0];
        quoted_arg = quoted_arg.substring(1);
      }
    }
    args[args.length] = unquoted_arg;
  }

  return args;
};
