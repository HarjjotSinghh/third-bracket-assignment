import { green } from "~/theme/colors/green";
import { red } from "~/theme/colors/red";
import { mauve } from "~/theme/colors/mauve";
import { iris } from "~/theme/colors/iris";
import { animationStyles } from "~/theme/animation-styles";
import { zIndex } from "~/theme/tokens/z-index";
import { shadows } from "~/theme/tokens/shadows";
import { durations } from "~/theme/tokens/durations";
import { colors } from "~/theme/tokens/colors";
import { textStyles } from "~/theme/text-styles";
import { layerStyles } from "~/theme/layer-styles";
import { keyframes } from "~/theme/keyframes";
import { globalCss } from "~/theme/global-css";
import { conditions } from "~/theme/conditions";
import { slotRecipes, recipes } from "~/theme/recipes";
import { defineConfig } from '@pandacss/dev'
import { createPreset } from '@park-ui/panda-preset'
import amber from '@park-ui/panda-preset/colors/amber'
import sand from '@park-ui/panda-preset/colors/sand'

export default defineConfig({
  preflight: true,
  presets: [createPreset({ accentColor: amber, grayColor: sand, radius: 'xs' })],
  include: ['./src/**/*.{js,jsx,ts,tsx}', './pages/**/*.{js,jsx,ts,tsx}'],

  // or 'solid' or 'vue'
  jsxFramework: 'react',

  outdir: 'styled-system',
  globalCss: globalCss,
  conditions: conditions,
  plugins: [
    {
      name: 'Remove Panda Preset Colors',
      hooks: {
        'preset:resolved': ({ utils, preset, name }) =>
          name === '@pandacss/preset-panda'
            ? utils.omit(preset, ['theme.tokens.colors', 'theme.semanticTokens.colors'])
            : preset,
      },
    },
  ],

  theme: {
    extend: {
      animationStyles: animationStyles,
      recipes: recipes,
      slotRecipes: slotRecipes,
      keyframes: keyframes,
      layerStyles: layerStyles,
      textStyles: textStyles,

      tokens: {
        colors: colors,
        durations: durations,
        zIndex: zIndex
      },

      semanticTokens: {
        colors: {
          fg: {
            default: {
              value: {
                _light: "{colors.gray.12}",
                _dark: "{colors.gray.12}"
              }
            },

            muted: {
              value: {
                _light: "{colors.gray.11}",
                _dark: "{colors.gray.11}"
              }
            },

            subtle: {
              value: {
                _light: "{colors.gray.10}",
                _dark: "{colors.gray.10}"
              }
            }
          },

          iris: iris,
          gray: mauve,
          red: red,
          green: green
        },

        shadows: shadows,

        radii: {
          l1: {
            value: "{radii.xs}"
          },

          l2: {
            value: "{radii.sm}"
          },

          l3: {
            value: "{radii.md}"
          }
        }
      }
    }
  }
})