

## 4.2.4 (2025-01-16)

## 4.2.3 (2025-01-16)

## 4.2.2 (2025-01-16)

## 4.2.1 (2024-01-05)

# 4.2.0 (2023-11-08)


### Features

* support prom-client v15 ([5741862](https://github.com/matteodisabatino/express-prometheus-middleware/commit/57418629ede94e6faa0f139614847c49231f8bb3))

## 4.1.1 (2023-11-08)


### Reverts

* Revert "feat: support prom-client v15" ([50fc946](https://github.com/matteodisabatino/express-prometheus-middleware/commit/50fc946d309a8d1c8158544d4dcd3e356e5191c2))

# 4.1.0 (2023-11-08)


### Features

* support prom-client v15 ([9eae850](https://github.com/matteodisabatino/express-prometheus-middleware/commit/9eae8504f43cc6020520a3857f7c0c38c728d143))

# 4.0.0 (2023-08-03)


### Code Refactoring

* using req.route if available ([28f8076](https://github.com/matteodisabatino/express-prometheus-middleware/commit/28f80769ffa55321c198bbf73f804ea1469d1c20))


### BREAKING CHANGES

* if req.route is available metric refers to it instead of req.path

## 3.1.2 (2022-09-07)


### Bug Fixes

* always copying the file to avoid problems ([3230734](https://github.com/matteodisabatino/express-prometheus-middleware/commit/3230734e080c5c92fd3b7cafe461a8ea2a0c9206))

## 3.1.1 (2022-09-07)


### Bug Fixes

* Windows needs special permissions to create symlinks, hence for this OS is better to create a copy of the file ([2d72e5d](https://github.com/matteodisabatino/express-prometheus-middleware/commit/2d72e5d90f14843d4e5b14db1e86047f8727f9f2))

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