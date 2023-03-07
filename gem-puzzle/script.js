(function(){
/**
* создание параметра вывода
*/
	const frameSizeValue = [
		{
			id:1,
      size: "3*3",
      amount: 8,
      amountRowCol: 3,
    },
    {
			id:2,
      size: "4*4",
      amount: 15,
      amountRowCol: 4,
    },
    {
      id:3,
      size: "5*5",
      amount: 24,
      amountRowCol: 5,
    },
    {
			id:4,
      size: "6*6",
      amount: 35,
      amountRowCol: 6,
    },
    {
			id:5,
      size: "7*7",
      amount: 48,
      amountRowCol: 7,
    },
    {
			id:6,
      size: "8*8",
      amount: 63,
      amountRowCol: 8,
    }
  ]

/**
* создание начального значения
*/
/*
*	поиск значениий в локал сторедж
*/
	const isLocalStorage = () => {
		return localStorage.getItem('game') ? true : false
	}
/*
*	вывод значениий с локал сторедж
*/
	const frameSizeValueFromStorage = () => {
			let value = JSON.parse(localStorage.getItem('game'))
			return value.frameSizeValueIndex
	}
/*
*	задание новых полей в соответствии с локал сторедж
*/
  let basicValue = isLocalStorage() ? frameSizeValueFromStorage() : frameSizeValue[1];

/**
* создание блока 
*/
	const newDiv = document.createElement("div");
	newDiv.className = "container"

/**
* создание блока таймера
*/
const game = document.createElement("div");
game.id = "puzzle";

/**
* создание блока 
*/
  const control = document.createElement('div')
  control.className = "controls"

/**
* создание блока таймера
*/
  const time = document.createElement('div')
  time.className = "timerDisplay"
	time.innerHTML = `<span id="seconds">00</span>:<span id="tens">00</span><span>-Click to count:</span><span id="click">0</span>`

/**
* создание кнопки решения игры
*/
  const solveBtn = document.createElement('button')
  solveBtn.id = "solve"
  solveBtn.innerHTML = "solve"

/**
* создание кнопки обновления игры
*/
  const scrambleBtn = document.createElement('button')
  scrambleBtn.id = "scramble"
  scrambleBtn.innerHTML = "scramble"
/**
* создание кнопки top players
*/
  const topPlayersBtn = document.createElement('button')
	topPlayersBtn.id = "topPlayersBtn"
  topPlayersBtn.innerHTML = "top players"
/**
* создание кнопки top players
*/
  const saveBtn = document.createElement('button')
	saveBtn.id = "saveBtn"
  saveBtn.innerHTML = "Save"

/**
* поле статуса игрового поля
*/
  const frameSize = document.createElement('div')
  frameSize.className = "frame-size"
  frameSize.innerHTML = `Frame size: ${basicValue.size}`

/**
* поле выбора размера игрового поля
*/
  const otherValue = (arr) => {
    return arr.map(element => {return ` <button class="btn btn-primary" data-uid=${element.id}>${element.size}</button>`});
  }

  const otherSize = document.createElement('div')
  otherSize.className = "frame-size_other"
  otherSize.innerHTML = `Other sizes: ${otherValue(frameSizeValue)}`

/**
* создание audio
*/
	const audioController = document.createElement('div')
	audioController.id = "switch-container"
	audioController.innerHTML = `
	<label class="switch">
    <input type="checkbox"
			id="song">
    <!-- the white ball    -->
    <span class="slider round">
    </span>
	<!--  The Spark "sound off" icon  -->
	<span id="sound-off-icon">
		<svg class="svg-icon" viewBox="0 0 20 20">
		<path fill="none" d="M3.401,13.367h0.959l1.56-1.56H4.181v-4.07h3.177c0.207,0,0.405-0.084,0.553-0.23l3.608-3.633V6.21l1.56-1.56V1.983c0-0.315-0.192-0.602-0.485-0.721c-0.29-0.122-0.624-0.055-0.85,0.171L7.032,6.178h-3.63c-0.433,0-0.78,0.349-0.78,0.78v5.629C2.621,13.018,2.968,13.367,3.401,13.367z"></path>
		<path fill="none" d="M11.519,15.674l-2.416-2.418L8,14.358l3.745,3.753c0.149,0.149,0.349,0.228,0.553,0.228c0.1,0,0.201-0.019,0.297-0.059c0.291-0.12,0.483-0.405,0.483-0.72V9.28l-1.56,1.56V15.674z"></path>
		<path fill="none" d="M19.259,0.785c-0.167-0.168-0.387-0.25-0.606-0.25s-0.438,0.082-0.606,0.25l-4.968,4.968l-1.56,1.56l-4.496,4.494l-1.56,1.56L0.83,18.001c-0.335,0.335-0.335,0.877,0,1.213c0.167,0.167,0.386,0.251,0.606,0.251c0.22,0,0.439-0.084,0.606-0.251l5.407-5.407l1.105-1.104l2.965-2.966l1.56-1.56l6.18-6.181C19.594,1.664,19.594,1.12,19.259,0.785z"></path>
		</svg>
	</span>
    <!--  The Spark "sound on" icon  -->
  
  </label>
	`

/**
* создание audio
*/
	const audio = document.createElement('audio')
	audio.id = "audio"
	audio.src = "./audio.wav"

/**
* рендер полей
*/

  document.body.appendChild(newDiv)
  document.querySelector('.container').appendChild(control)
  document.querySelector('.controls').appendChild(audioController)
  document.querySelector('.controls').appendChild(saveBtn)
  document.querySelector('.controls').appendChild(topPlayersBtn)
  document.querySelector('.controls').appendChild(otherSize)
  document.querySelector('.controls').appendChild(frameSize)
  document.querySelector('.controls').appendChild(scrambleBtn)
  document.querySelector('.controls').appendChild(solveBtn)
  document.querySelector('.controls').appendChild(time)
  document.querySelector('.container').appendChild(game)
  document.querySelector('.container').appendChild(audio)


/**
* создание секундомера (stopwatch)
*/
	let seconds = 0; 
	let tens = 00; 
	let appendTens = document.getElementById("tens")
	let appendSeconds = document.getElementById("seconds")
	let clicks = document.getElementById("click")
	let controllerAudio = document.getElementById("song")
	let Interval;
	let clicker = 0;
	let soundOn = false;

	controllerAudio.addEventListener("input", toggleSoundOnOff)

	function toggleSoundOnOff()  {
		if (soundOn == true) {
			soundOn = false
		} else if (soundOn == false) {
			soundOn = true
		}
	}
// =============================
// The sound button function
// =============================
  function playSound() {
    if (soundOn !== false) {
      let sound = document.getElementById("audio");
      sound.play();      
    }
  }


	function start(event) {
		if (event.target.classList.contains("empty")) {
			return;
		}

		clearInterval(Interval);
		Interval = setInterval(startTimer, 10);
		playSound()
	}

	function stop() {
		clearInterval(Interval);
		let saveQuestion = confirm('Do you want to save the game?')
		if(saveQuestion){
			return true
		} else {
			return false
		}
	}

	function reset() {
		clearInterval(Interval);
		tens = "00";
		seconds = "00";
		appendTens.innerHTML = tens;
		appendSeconds.innerHTML = seconds;
		clicker = 0
		clicks.innerHTML = clicker;
	}

	function startTimer () {
		tens++; 
		
		if(tens <= 9){
			appendTens.innerHTML = "0" + tens;
		}
		
		if (tens > 9){
			appendTens.innerHTML = tens;
			
		} 
		
		if (tens > 99) {
			
			seconds++;
			appendSeconds.innerHTML = "0" + seconds;
			tens = 0;
			appendTens.innerHTML = "0" + 0;
		}
		
		if (seconds > 9){
			appendSeconds.innerHTML = seconds;
		}
	}

	const onInit = function() {
		let value = JSON.parse(localStorage.getItem('game'))
		let elementsLocalStorage = value ? value.elementsAttrs : false
		let counterLocalStorage = value ? value.counts : false
		let timerLocalStorage = value ? value.time : false
		let splitTime = timerLocalStorage ? timerLocalStorage.split(':') : false

		const counter = document.querySelector('#click')
		const elements = document.querySelectorAll("#puzzle span");
		const timeSec = document.querySelector("#seconds");
		const timeMiliSec = document.querySelector("#tens");
		
		if(isLocalStorage()){
			timeSec.innerHTML = splitTime[0]
			timeMiliSec.innerHTML = splitTime[1]

			counter.innerHTML = counterLocalStorage

			elements.forEach((item, index) => {
				item.setAttribute("id", elementsLocalStorage[index].id);
				item.setAttribute("style", elementsLocalStorage[index].style);
			})
		}

		isInitialized = true;
		return;
	}
/**
* create game
*/ 
	let state = 1;
	let puzzle = document.getElementById('puzzle');
	let isInitialized = false;

	// Создает решенную головоломку
	solve();
	scramble();

	
	// Прослушивает нажатия на ячейки пазла
	puzzle.addEventListener('click', function(e){
		if(state == 1){
			// Включает анимацию скольжения
			puzzle.className = 'animate';
			shiftCell(e.target, true);
			start(e)
		}
	});
	
	// Прослушивает нажатия на кнопки управления
	document.getElementById('solve').addEventListener('click', solve);
	document.getElementById('scramble').addEventListener('click', scramble);

	/**
	 * Создает решенную головоломку
	 *
	 */
	function solve(){
		
		if(state == 0){
			return;
		}
		puzzle.innerHTML = '';
		reset()
		playSound()
/**
* отрисовка нового поля
*/

		let distance

		switch (basicValue.id) {
			case 1:
				distance = (basicValue.amountRowCol * 30) + 5
				break;
			case 2:
				distance = (basicValue.amountRowCol * 30) + 5
				break;
			case 3:
				distance = (basicValue.amountRowCol * 30) + 7
				break;
			case 4:
				distance = (basicValue.amountRowCol * 30) + 7
				break;
			case 5:
				distance = (basicValue.amountRowCol * 30) + 9
				break;
			case 6:
				distance = (basicValue.amountRowCol * 30) + 10
				break;
		}

		puzzle.style.width = `${distance}px`
		puzzle.style.height = `${distance}px`



		
		let n = 1;
		for(let i = 0; i < basicValue.amountRowCol; i++){
			for(let j = 0; j < basicValue.amountRowCol; j++){
				let cell = document.createElement('span');
				cell.id = 'cell-'+i+'-'+j;
				cell.style.left = (j*30+1*j+1)+'px';
				cell.style.top = (i*30+1*i+1)+'px';
				
				if(n <= basicValue.amount){
					cell.classList.add('number');
					cell.classList.add((i%2==0 && j%2>0 || i%2>0 && j%2==0) ? 'dark' : 'light');
					cell.innerHTML = (n++).toString();
				} else {
					cell.className = 'empty';
				}
				
				puzzle.appendChild(cell);
			}
		}
		
	}

	/**
	 * Сдвигает ячейку с номером на пустую ячейку
	 */
	function shiftCell(cell, isClicker = false){
		
		// Проверяет, имеет ли выбранная ячейка номер
		if(cell.className != 'empty'){
			
			// Пытается получить пустую соседнюю клетку
			let emptyCell = getEmptyAdjacentCell(cell);
			
			if(emptyCell){
				let tmp = {style: cell.style.cssText, id: cell.id};
				
				// Обмен значениями идентификатора и стиля
				cell.style.cssText = emptyCell.style.cssText;
				cell.id = emptyCell.id;
				emptyCell.style.cssText = tmp.style;
				emptyCell.id = tmp.id;

				if (isClicker) {
					clicker++;
					clicks.innerHTML = clicker;
				}
				
				if(state == 1){
					// Проверяет порядок следования чисел
					setTimeout(checkOrder, 150);
				}
			}	
		}
	}

	/**
	 * Получает конкретную ячейку по строке и столбцу
	 */
	function getCell(row, col){
	
		return document.getElementById('cell-'+row+'-'+col);
		
	}

	/**
	 * Получает пустую ячейку
	 */
	function getEmptyCell(){
	
		return puzzle.querySelector('.empty');
			
	}
	
	/**
	 * Получает пустую соседнюю ячейку, если она существует
	 */
	function getEmptyAdjacentCell(cell){
		
		// Получает все соседние ячейки
		let adjacent = getAdjacentCells(cell);
		
		// Searches for empty cell
		for(let i = 0; i < adjacent.length; i++){
			if(adjacent[i].className == 'empty'){
				return adjacent[i];
			}
		}
		
		// Empty adjacent cell was not found
		return false;
		
	}

	/**
	 * Получает все соседние ячейки
	 *
	 */
	function getAdjacentCells(cell){
		
		let id = cell.id.split('-');
		
		// Получает индексы положения ячеек
		let row = parseInt(id[1]);
		let col = parseInt(id[2]);
		
		let adjacent = [];
		
		// Получает все возможные соседние клетки
		if(row < basicValue.amountRowCol-1){adjacent.push(getCell(row+1, col));}			
		if(row > 0){adjacent.push(getCell(row-1, col));}
		if(col < basicValue.amountRowCol-1){adjacent.push(getCell(row, col+1));}
		if(col > 0){adjacent.push(getCell(row, col-1));}
		
		return adjacent;
		
	}
	
	/**
	 * Проверяет правильность порядка следования чисел
	 *
	 */
	function checkOrder(){
		
		// Проверяет, находится ли пустая ячейка в правильном положении
		if(getCell(basicValue.amountRowCol-1, basicValue.amountRowCol-1).className != 'empty'){
			return;
		}
	
		let n = 1;
		// Просматривает все ячейки и проверяет числа
		for(let i = 0; i < basicValue.amountRowCol; i++){
			for(let j = 0; j < basicValue.amountRowCol; j++){
				if(n <= basicValue.amount && getCell(i, j).innerHTML != n.toString()){
					// Неправильный порядок
					return;
				}
				n++;
			}
		}

		let getlocalStorage = () => {
			return JSON.parse(localStorage.getItem('playrs'))
		}

		let addlocalStorage = (arr) => {
			const currlocalStorage = getlocalStorage()
			let array = []
			if(currlocalStorage === null){
				array.push(arr)
				localStorage.setItem("playrs", JSON.stringify(array))
			}
			if(currlocalStorage){
				if(currlocalStorage.length < 10){
					currlocalStorage.push(arr)
					currlocalStorage.sort((a, b) => a.seconds > b.seconds ? 1 : -1)
					localStorage.setItem("playrs", JSON.stringify(currlocalStorage))
				} else if (currlocalStorage.length >=10){
					
					
					currlocalStorage.forEach((item, index) => {
						console.log("item", item);
						console.log("arr", arr);

						if(item.seconds >= arr.seconds){
							if(item.tens >= arr.tens){
								if(item.clicker >= arr.clicker){
									return currlocalStorage.splice(index, 1, arr)
								}
							}
						}
					});
					currlocalStorage.sort((a, b) => a.seconds > b.seconds ? 1 : -1)
					localStorage.setItem("playrs", JSON.stringify(currlocalStorage))
				}
			}
		}
		
		
		// Загадка разгадана, предлагает разгадать ее
		if(!alert(`Hooray! You solved the puzzle in ${seconds}:${tens} and ${clicker} moves!`)){
			let obj =
				{seconds: +seconds, 
				tens: +tens,
				clicker: +clicker}
			addlocalStorage(obj)
			scramble();
			reset()
		}
	}

	/**
	 * Перемешивание
	 *
	 */
	function scramble(){
	
		if(state == 0){
			return;
		}

		puzzle.classList.remove('animate');
		state = 0;
		reset()
		playSound()

		let previousCell;
		let i = 1;
		let interval = setInterval(function(){
			if(i <= 100){
				let adjacent = getAdjacentCells(getEmptyCell());
				if(previousCell){
					for(let j = adjacent.length-1; j >= 0; j--){
						if(adjacent[j].innerHTML == previousCell.innerHTML){
							adjacent.splice(j, 1);
						}
					}
				}
				// Получает случайную соседнюю клетку и запоминает ее для следующей итерации
				previousCell = adjacent[rand(0, adjacent.length-1)];
				shiftCell(previousCell);
				i++;
			} else {
				clearInterval(interval);
				state = 1;

				if (!isInitialized) {
					onInit();
				}
				
			}
		}, 5);
	}

/**
* Генерирует случайное число
*/
	function rand(from, to){
		return Math.floor(Math.random() * (to - from + 1)) + from;
	}

/**
* Вывод нового значение поля 
*/
	const otherEvent = document.querySelector('.frame-size_other')
	const frameEvent = document.querySelector('.frame-size')

	otherEvent.addEventListener("click", (e) => {
		const sizeId = +e.target.getAttribute('data-uid')
		const size = frameSizeValue.find(size => size.id === sizeId)
		frameEvent.innerHTML = `Frame size: ${size.size}`
		basicValue = size
		solve();
		scramble();
	})
/**
* Вывод нового top Players
*/
	let localStorages = () => {
		if(localStorage.getItem('playrs') === null){
			return alert('You haven\'t played this game yet')
		} else {
			let currlocalStorage = JSON.parse(localStorage.getItem('playrs'))
			let curr = ''
			let currtime = 0
			currlocalStorage.forEach((item) => {
				currtime++
				curr = curr + `${currtime}. Time: ${item.seconds}:${item.tens}. Click: ${item.clicker}\n`
			})
			return alert(`Best player\n${curr}`)
		}
	}
	
	let topPlayer = document.querySelector("#topPlayersBtn")

	topPlayer.addEventListener("click", localStorages)

	let saveOn = true 
	const saveCells = function() {
		const elements = document.querySelectorAll("#puzzle span");
		let elementsAttrs = [];
		elements.forEach(item => {
			let attrs = {};
			attrs.id = item.getAttribute("id");
			attrs.style = item.getAttribute("style");
			elementsAttrs.push(attrs);
		})
		const savedGame = {
			frameSizeValueIndex: basicValue,
			time: `${seconds}:${tens}`,
			counts: clicker,
			elementsAttrs: elementsAttrs
		};
		if(stop() == true){
			return localStorage.setItem("game", JSON.stringify(savedGame))
		} else {
			return false
		}
	}
	let saveBtns = document.querySelector('#saveBtn')
	saveBtns.addEventListener("click", toggleSaveOnOff)

	function toggleSaveOnOff()  {
		if (saveOn == true) {
			saveOn = false
			saveCells() 
		} else if (saveOn == false) {
			saveOn = true
		}
	}
}());

