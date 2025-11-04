import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // 포맷팅 관련 규칙은 Prettier에서 처리하므로 ESLint에서는 비활성화
      semi: 'off',
      quotes: 'off',
      'jsx-quotes': 'off',

      // 개발 컨벤션: 변수명 camelCase 사용
      camelcase: [
        'error',
        {
          properties: 'always',
          ignoreGlobals: true,
          allow: ['^[A-Z][A-Z0-9_]*$'], // 상수는 UPPER_SNAKE_CASE 허용
        },
      ],

      // TypeScript 관련: any 타입 지양
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      // 컴포넌트 관련: 함수 선언문 사용 권장
      'prefer-function-declaration-over-expression': 'off',

      // 컴포넌트 안에 컴포넌트 선언 금지
      'react-hooks/rules-of-hooks': 'error',
      'react/no-unstable-nested-components': ['error', { allowAsProps: true }],

      // 코드 품질 관련
      'no-unused-vars': 'off', // TypeScript에서 처리
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

      // 들여쓰기는 Prettier에서 처리하므로 ESLint에서는 비활성화
      indent: 'off',
      '@typescript-eslint/indent': 'off',

      // 최대 줄 길이는 Prettier에서 처리
      'max-len': 'off',

      // 마지막 쉼표는 Prettier에서 처리
      'comma-dangle': 'off',
      '@typescript-eslint/comma-dangle': 'off',
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
]);

export default eslintConfig;
