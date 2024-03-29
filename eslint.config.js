import { julr } from '@julr/tooling-configs/eslint'

export default await julr(
  {
    typescript: {
      tsconfigPath: ['./tsconfig.json', './resources/tsconfig.json'],
      typeAwareRules: false,
    },
  },
  {
    rules: {
      '@typescript-eslint/consistent-type-imports': 'off',
    },
  },
)
