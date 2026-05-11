# opendata-fukui

このリポジトリには、福井市オープンデータパークのオープンデータ（主に福祉・衛生・教育サービス）を自動的にスクレイピング、処理、可視化するスクリプトが含まれています。処理されたデータは、GitHub Pages上でインタラクティブな静的ウェブサイトとして公開されます。

メインページでは、保育園、学校、病院、福祉施設など、利用可能なすべてのデータセットの包括的なリストを提供しています。


![データセットのテーブルを表示しているメインインデックスページのスクリーンショット](https://user-images.githubusercontent.com/12499155/210158804-0994119d-2101-447a-875f-25595304603e.png)


各データセットには、インタラクティブなテーブルと位置情報に基づく地図を備えた専用のページがあります。


![小学校の地図とデータテーブルを表示している詳細ページのスクリーンショット](https://user-images.githubusercontent.com/12499155/210158810-72c05067-1510-4355-8968-356193798679.png)


## デモ

**▶ [福井県福井市 福祉オープンデータ (Fukui City Welfare Open Data)](https://code4fukui.github.io/opendata-fukui/)**

## 機能

- **自動スクレイピング:** 福井市の公式ウェブサイトから最新のデータリストを取得します。
- **データ変換:** 元のXLSファイルをダウンロードし、より扱いやすいCSV形式に変換します。
- **静的サイト生成:** メインのインデックスページと、各データセットの個別詳細ページを作成します。
- **インタラクティブな可視化:**
  - データをソートやフィルタリングが可能なテーブルで表示します。
  - 緯度・経度の座標を含むデータセットに対して、インタラクティブな地図を自動生成します。

## データの更新方法

このプロジェクトでは[Deno](https://deno.land/)を使用しています。実行する前にインストールされていることを確認してください。データの更新は、以下の順序でスクリプトを実行することで行います。

1.  **データインデックスのスクレイピング**
    このスクリプトはソースページからデータセットのリストを取得し、`opendata-fukui.csv`を作成します。
    ```bash
    deno run -A makeIndex.js
    ```

2.  **ソースXLSファイルのダウンロード**
    このスクリプトは`opendata-fukui.csv`を読み込み、リンクされているXLSファイルを`xls/`ディレクトリにダウンロードします。
    ```bash
    deno run -A download.js
    ```

3.  **XLSからCSVへの変換**
    このスクリプトは`xls/`内の各ファイルをCSV形式に変換し、`csv/`ディレクトリに保存します。また、`opendata-fukui.csv`を新しいCSVのパスで更新します。
    ```bash
    deno run -A makeCSV.js
    ```

4.  **静的HTMLサイトの生成**
    このスクリプトは最終的な`opendata-fukui.csv`を読み込み、`index.html`とすべての詳細ページを`html/`ディレクトリに生成します。
    ```bash
    deno run -A makeHTML.js
    ```

## データソース

すべてのデータは[福井市オープンデータパーク (Fukui City Open Data Park)](https://www.city.fukui.lg.jp/sisei/tokei/opendata/opengov.html)から取得しています。

- このリポジトリでは特に、[福祉・衛生・教育 (Welfare, Hygiene, Education)](https://www.city.fukui.lg.jp/sisei/tokei/opendata/p018973.html)カテゴリのデータを処理しています。

## 謝辞

このプロジェクトは[Code for Fukui](https://github.com/code4fukui)の取り組みであり、`csv-viewer`や`csv-map`などのオープンソースコンポーネントを利用しています。
