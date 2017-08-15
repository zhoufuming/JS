<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>php的面向对象的继承</title>
</head>
<body>
	<?php  
		class Person{
			function __construct($name,$sex){
				// "->" 相当于js的"." => $this.name = $name; 
				$this->name = $name;
				$this->sex = $sex;
			}

			function showName(){
				echo $this->name;
			}

			function showSex(){
				echo $this->sex;
			}
		}

		class Worker extends Person{
			function __curstuct ($name,$sex,$job){
				perent::__construct($name,$sex);// 继承父级的类
				$this->job = $job;
			}
			function showJob(){
				echo $this->job;
			}
		}
		$w1 = new Worker("zhou","男","打杂的");
		$w1->showName();
		$w1->showSex();
		$w1->showJob();
	?>
</body>
</html>