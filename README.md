# opendata-fukui

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

This repository contains scripts to automatically scrape, process, and visualize open data from Fukui City's Open Data Park, focusing on welfare, health, and education services. The processed data is published as an interactive static website on GitHub Pages.

The main page provides a comprehensive list of all available datasets, including childcare centers, schools, hospitals, and welfare facilities.


![Screenshot of the main index page showing a table of datasets](https://user-images.githubusercontent.com/12499155/210158804-0994119d-2101-447a-875f-25595304603e.png)


Each dataset has a dedicated page with an interactive table and a map for location-based data.


![Screenshot of a detail page showing a map and a data table for elementary schools](https://user-images.githubusercontent.com/12499155/210158810-72c05067-1510-4355-8968-356193798679.png)


## Demo

**▶ [福井県福井市 福祉オープンデータ (Fukui City Welfare Open Data)](https://code4fukui.github.io/opendata-fukui/)**

## Features

- **Automated Scraping:** Fetches the latest data list from the official Fukui City website.
- **Data Conversion:** Downloads original XLS files and converts them into the more accessible CSV format.
- **Static Site Generation:** Creates a main index page and individual detail pages for each dataset.
- **Interactive Visualization:**
  - Displays data in sortable, filterable tables.
  - Automatically generates interactive maps for datasets containing latitude and longitude coordinates.

## How to Update the Data

This project uses [Deno](https://deno.land/). Ensure it is installed before proceeding. The data is updated through a series of scripts that must be run in order.

1.  **Scrape the data index**
    This script fetches the list of datasets from the source page and creates `opendata-fukui.csv`.
    ```bash
    deno run -A makeIndex.js
    ```

2.  **Download source XLS files**
    This script reads `opendata-fukui.csv` and downloads the linked XLS files into the `xls/` directory.
    ```bash
    deno run -A download.js
    ```

3.  **Convert XLS to CSV**
    This script converts each file in `xls/` to CSV format, saving them in the `csv/` directory. It also updates `opendata-fukui.csv` with paths to the new CSVs.
    ```bash
    deno run -A makeCSV.js
    ```

4.  **Generate the static HTML site**
    This script reads the final `opendata-fukui.csv` and generates `index.html` and all detail pages in the `html/` directory.
    ```bash
    deno run -A makeHTML.js
    ```

## Data Source

All data is sourced from the [福井市オープンデータパーク (Fukui City Open Data Park)](https://www.city.fukui.lg.jp/sisei/tokei/opendata/opengov.html).

- This repository specifically processes data from the [福祉・衛生・教育 (Welfare, Hygiene, Education)](https://www.city.fukui.lg.jp/sisei/tokei/opendata/p018973.html) category.

## Credits

This project is an initiative by [Code for Fukui](https://github.com/code4fukui) and utilizes several open-source components, including `csv-viewer` and `csv-map`.