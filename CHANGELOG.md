

# 3.1.0 (2022-05-29)


### Features

* updated @matteodisabatino/gc_info to support node v18 ([9e07afd](https://github.com/matteodisabatino/express-prometheus-middleware/commit/9e07afd68f17c05f91ad9291635aa3e099e315e6))

# 3.0.0 (2022-05-19)


### Code Refactoring

* add Grafana dashboard ([1512da7](https://github.com/matteodisabatino/express-prometheus-middleware/commit/1512da7dd613eba3f34e41d2e721aa18d07cbcc0))


### BREAKING CHANGES

* fully deprecation for versions 1 and 2 of the module

## 2.0.5 (2022-03-27)


### Bug Fixes

* rimraf and symian now are production dependencies ([0f64aab](https://github.com/matteodisabatino/express-prometheus-middleware/commit/0f64aaba328d6bbaa18f711b5df4ae01f43d2bb0))


## 2.0.4 (2022-03-27)


### Bug Fixes

* creation of symlink for package.json is now made by postinstall hook ([6288b73](https://github.com/matteodisabatino/express-prometheus-middleware/commit/6288b732b8cd529547962ad64ab0a37e82e12332))


## 2.0.3 (2022-03-27)


### Bug Fixes

* no importing typescript helpers ([d00e9d2](https://github.com/matteodisabatino/express-prometheus-middleware/commit/d00e9d22a041ccffcc28affa62f1d83ab731417e))


## 2.0.2 (2022-03-26)


### Bug Fixes

* typo on CHANGELOG ([11b1336](https://github.com/matteodisabatino/express-prometheus-middleware/commit/11b13369b49179ff693614dd022700a96596557e))


## 2.0.1 (2022-03-26)


### Bug Fixes

* fixed CHANGELOG ([7dca654](https://github.com/matteodisabatino/express-prometheus-middleware/commit/7dca65420ae9a904563a75e96390dbf9f1743a15))


# 2.0.0 (2022-03-26)


### Code Refactoring

* private variables moved to separate, non-exported class ([6e9e5cc](https://github.com/matteodisabatino/express-prometheus-middleware/commit/6e9e5cc41f88a08f7d22fdf0a5de38be1d28bb39))


### BREAKING CHANGES

* configuration variables are now readonly at all effects
* property "version" is now static

# 1.0.0 (2022-03-17)


### Code Refactoring

* support for all existing Node.js versions since 6.0.0 ([6c76926](https://github.com/matteodisabatino/express-prometheus-middleware/commit/6c76926b0eb53683ac9af20c6f38fc77205bd7bc))


### BREAKING CHANGES

* The module now exports a class
* express is still a peer dependency but version 2 is no longer supported
* prom-client is now required as peer dependency


## 0.0.1 (2021-10-09)


### Bug Fixes

* the specification must be done in package.json ([8c8724d](https://github.com/matteodisabatino/express-prometheus-middleware/commit/8c8724d33c8a67be31923910ab69126352027cc0))