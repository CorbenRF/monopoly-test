<script>
export default {
  methods: {
    formatSum(sum) {
      let strOutput = '';
      let copySum = sum;
      if (sum < 0) {
        strOutput += '-';
        copySum *= -1;
      }

      const millions = Math.floor(copySum / 1000000);
      const thousands = Math.floor((copySum % 1000000) / 1000);
      if (millions > 0) {
        strOutput += `${millions} ${this.pluralize(millions, 'миллион', 'миллиона', 'миллионов')} `;
      }

      if (thousands > 0 || millions === 0) {
        strOutput += `${thousands} ${this.pluralize(thousands, 'тысяча', 'тысячи', 'тысяч')}`;
      }

      return strOutput.trim();
    },
    pluralize(number, one, two, five) {
      let n = Math.abs(number);
      n %= 100;
      if (n >= 5 && n <= 20) {
        return five;
      }
      n %= 10;
      if (n === 1) {
        return one;
      }
      if (n >= 2 && n <= 4) {
        return two;
      }
      return five;
    },
  },
};
</script>
