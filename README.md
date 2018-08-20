# MailChimp-TypeScript

[![Build Status](https://travis-ci.org/StardustGogeta/MailChimp-TypeScript.svg?branch=master)](https://travis-ci.org/StardustGogeta/MailChimp-TypeScript)
[![codecov](https://codecov.io/gh/StardustGogeta/MailChimp-TypeScript/branch/master/graph/badge.svg)](https://codecov.io/gh/StardustGogeta/MailChimp-TypeScript)

A wrapper for the MailChimp v3.0 API, written in TypeScript 3.0.

This is largely based off of the [Python wrapper](https://github.com/charlesthk/python-mailchimp) for the API. Examples of usage can be found in the `/test` directory.

API calls are made using the [`request`](https://github.com/request/request) Node.JS module. Automated unit-testing is performed by [Travis-CI](https://travis-ci.org/), [Jest](https://jestjs.io/), and [codecov.io](https://codecov.io/).

## To-Do List

- Add all supported API calls
- Recognize required fields in API calls
- Write comprehensive unit tests
- Create full usage documentation
