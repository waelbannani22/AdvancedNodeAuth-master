 import java.util.Scanner;
 import java.util.NoSuchElementException;

public class MyClass { 
 public static void main(String args[]) {
		Scanner scanner = new Scanner(System.in);
		
		try {
		 System.out.println("Type a Line and enter....");
		String txt = scanner.nextLine();
		System.out.println("You have typed...");
		System.out.println(txt);
		} catch (NoSuchElementException e) {
		    System.out.println("Type something in the Stdin box above....");
		}
		
	}

	
}

