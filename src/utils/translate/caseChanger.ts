import _ from "lodash";

export const toPascalCase = (str: string) => _.upperFirst(_.camelCase(str));