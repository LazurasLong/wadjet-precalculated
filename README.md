# ![👁️‍🗨️ Wadjet](https://raw.githubusercontent.com/danmaq/wadjet-precalculated/images/wadjet.svg?sanitize=true)

🔮🎂 The __your birth date__ is based on statistical psychology and will __expose your personality__.
This package as a module does its calculations.

## What is different from [Wadjet](https://github.com/danmaq/wadjet)?

* Pre-calculated.
* Reverse calculation. (Personal type -> birthday)

## APIs

* `personalityAsync(birth: string) -> Promise.<Personality>`
* `birthdaysAsync(type: string, category: 'inner'|'outer'|'workstyle') -> Promise.<Date[]>`
* `detailAsync(type: string) -> Promise.<Detail>`

_TBW_

## See also

* [Release history](https://github.com/danmaq/wadjet-precalculated/releases)
* [Original version](https://github.com/danmaq/wadjet)
* [Implemented it for command line interface](https://github.com/danmaq/wadjet-cli)
* [F# Version (Obsolete)](https://github.com/danmaq/birth.fs)
