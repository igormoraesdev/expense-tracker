export class Masks {
  static formatNumber(value: string, prefix = "") {
    value = value.replace(/\D/g, "");
    while (value.length < 3) {
      value = "0" + value;
    }

    let integerPart = value.slice(0, -2) || "0";
    const decimalPart = value.slice(-2);

    integerPart = integerPart
      .replace(/^(0+)(\d)/, "$2")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return `${prefix} ${integerPart},${decimalPart}`;
  }
  static formatPhoneNumber(value: string) {
    return value
      .replace(/\D/g, "")
      .slice(0, 11)
      .replace(/^(\d\d)(\d)/g, "($1) $2")
      .replace(/(\d{5})(\d{4})/, "$1-$2");
  }
}
