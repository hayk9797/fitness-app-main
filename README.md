# FitnessApp — Aplikacja do zarządzania treningami

**FitnessApp** to prosta i funkcjonalna aplikacja webowa, umożliwiająca użytkownikom rejestrowanie się, logowanie oraz zarządzanie swoimi treningami. Projekt został stworzony w oparciu o Node.js, Express oraz EJS i zapisuje dane w lokalnych plikach JSON.

---

## Cel projektu

Celem projektu jest stworzenie funkcjonalnej aplikacji internetowej, która umożliwia użytkownikom zarządzanie swoimi treningami fitness w sposób prosty i przejrzysty. Aplikacja pozwala na:

- tworzenie i zapisywanie nowych planów treningowych z określeniem ich typu, intensywności oraz czasu trwania,
- edytowanie i usuwanie istniejących treningów,
- śledzenie postępów użytkownika poprzez liczenie całkowitej liczby treningów,
- generowanie tygodniowego podsumowania aktywności z podziałem na dni,
- zarządzanie kontem użytkownika poprzez rejestrację i logowanie z walidacją bezpieczeństwa haseł,
- korzystanie z estetycznego i responsywnego interfejsu użytkownika.

Projekt został zrealizowany zgodnie z wzorcem architektonicznym MVC (Model-View-Controller) i przy użyciu Server-Side Rendering (EJS) w środowisku Node.js.

---

##  Funkcje aplikacji

-  Rejestracja i logowanie użytkowników
-  Bezpieczne hasła (walidacja + szyfrowanie bcrypt)
-  Rejestracja użytkownika z walidacją hasła (min. 6 znaków, co najmniej jedna litera i jedna cyfra)
-  Sesje użytkowników (express-session)
-  Dodawanie, edytowanie i usuwanie treningów
-  Widok listy treningów tylko dla zalogowanego użytkownika
-  Automatyczne przypisanie daty dodania treningu
-  Tygodniowe podsumowanie aktywności (tabela z datami)
-  Estetyczny wygląd (custom CSS + tło dla każdej strony)
-  Obsługa języka polskiego (pełne tłumaczenie UI)
-  Dane zapisywane do lokalnych plików JSON (fs-extra)
-  Obsługa błędów i komunikaty walidacyjne


---

##  Instrukcja uruchomienia aplikacji

Aby uruchomić aplikację lokalnie, wykonaj poniższe kroki:

 ### Wymagania wstępne
 
-Node.js w wersji minimum 18.x (zalecana najnowsza wersja LTS)

-Menedżer pakietów npm (domyślnie instalowany z Node.js)

-Terminal systemowy (np. CMD, PowerShell, Terminal VSCode)

 ### Instalacja zależności

W katalogu głównym projektu uruchom:

- npm install

### Uruchomienie aplikacji

Po zainstalowaniu wszystkich zależności uruchom aplikację poleceniem:

- node app.js

Aplikacja zostanie uruchomiona na porcie 3000 i będzie dostępna pod adresem:

http://localhost:3000

---

##  Wykorzystane biblioteki zewnętrzne

Biblioteka	
- **express** 	        [Główna biblioteka do tworzenia serwera i obsługi routingu.]
- **ejs**	                [Szablon silnik do generowania dynamicznych widoków po stronie serwera.]
- **method-override**	    [Umożliwia obsługę metod PUT i DELETE w formularzach HTML.]
- **express-session**	    [Służy do zarządzania sesją użytkownika (logowanie i autoryzacja).]
- **bcrypt**	            [Do bezpiecznego haszowania i porównywania haseł użytkowników.]
- **fs-extra**	        [Rozszerzenie modułu fs, ułatwia pracę z plikami (odczyt/zapis JSON).]
- **dayjs**	            [Lekka biblioteka do pracy z datami (analiza i formatowanie dat).]

---


##  Opis struktury aplikacji

Aplikacja została zaprojektowana w oparciu o wzorzec architektoniczny MVC (Model-View-Controller) i zawiera następujące komponenty:

### Modele:

- **userModel.js**: odpowiada za operacje na użytkownikach – tworzenie nowych użytkowników, wyszukiwanie po nazwie użytkownika lub ID oraz zapis danych do pliku users.json.

- **workoutModel.js**: odpowiada za operacje związane z treningami – dodawanie, edytowanie, usuwanie i pobieranie danych z pliku workouts.json.

### Kontrolery: 

- **authController.js**: obsługuje procesy logowania, rejestracji i wylogowania użytkowników oraz walidację haseł i błędów.

- **workoutController.js**: zarządza logiką treningów – odpowiada za tworzenie, edycję, usuwanie, wyświetlanie treningów oraz generowanie statystyk tygodniowych.

### Widoki (views):

- **register.ejs**: formularz rejestracji nowego użytkownika.

- **login.ejs**: formularz logowania.

- **index.ejs**: strona główna pokazująca wszystkie treningi użytkownika oraz statystyki.

- **new.ejs**: formularz dodawania nowego treningu.

- **edit.ejs**: formularz edycji istniejącego treningu.

Struktura ta zapewnia przejrzystość kodu i ułatwia dalszy rozwój aplikacji. Widoki renderowane są po stronie serwera za pomocą silnika EJS, a dane przechowywane są lokalnie w plikach .json.

---

##  Przykładowe dane wejściowe

###  Rejestracja użytkownika

- Nazwa użytkownika: huseyin_kahraman
- Hasło: 38868huseyin

###  Dodawanie nowego treningu

- Tytuł: Poranny kardio
- Typ: Kardio
- Czas trwania: 30 minut
- Intensywność: Średnia

---

##  Twórca 
- Huseyin Kahraman
- Projekt Końcowy z Node.js – 2025
- Aplikacja Fitness oparta na MVC + EJS + JSON
