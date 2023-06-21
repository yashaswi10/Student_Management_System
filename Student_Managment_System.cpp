#include<bits/stdc++.h>
#include<iostream>
#include<string>
#include<iomanip>
using namespace std;

class student
{
    private:
        struct details
        {
            string Reg_No;
            string Roll_No;
            string Name;
            char Gender;
            string Department;
            int Sem_No;
            float CGPA;
            details *next;
        };
    public:
        details *head=NULL;
        void menu()
        {
            int ch,n;
            while(1)
            {
                cout<<setfill('=')<<endl;
                cout<<setw(60)<<"Student Management System"<<setw(35)<<""<<"\n\n"<<endl;
                cout<<"1.Insert\t2.Delete\t3.Update\t4.Search\t5.Display\t6.Exit.\n"<<endl;
                cout<<"Enter your choice: ";
                cin>>ch;
                switch (ch)
                {
                case 1:
                    cout<<"No.of students details you want to enter:"<<endl;
                    cin>>n;
                    for(int i=0;i<n;i++)
                    {
                        insert_student_details();
                    }
                    break;
                case 2:
                    cout<<"No.of students details you want to enter:"<<endl;
                    cin>>n;
                    for(int i=0;i<n;i++)
                    {
                        delete_student_details();   //Details of the student are deleted permanently.
                    }
                    break;
                case 3:
                    cout<<"No.of students details you want to update:"<<endl;
                    cin>>n;
                    for(int i=0;i<n;i++)
                    {
                        update_student_datails();
                    } 
                    break;
                case 4:
                    search_student_details();
                    break;
                case 5:
                    display_student_details();
                    break;
                case 6:
                    exit(0);
                default:
                    cout<<"INVALID CHOICE!"<<endl;
                    break;
                }
            }
        }
        void insert_student_details()
        {
            system("cls");
            cout<<setfill('=')<<endl;
            cout<<setw(60)<<"Student Management System"<<setw(35)<<""<<"\n\n"<<endl;
            details *new_student=new details;
            cout<<"New student details: "<<endl;
            cout<<"\nEnter student's Reg No : ";
            cin>>new_student->Reg_No;
            cout<<"\nEnter student's Roll No : ";
            cin>>new_student->Roll_No;
            cout<<"\nEnter student's Name : ";
            cin.ignore();
            getline(cin, new_student->Name);
            cout<<"\nEnter student's gender(M if male , F if female) : ";
            cin>>new_student->Gender;
            cout<<"\nEnter student's Department : ";
            cin.ignore();
            getline(cin,new_student->Department);
            cout<<"\nEnter student's semester Number : ";
            cin>>new_student->Sem_No;
            cout<<"\nEnter student's CGPA : ";
            cin>>new_student->CGPA;
            

            new_student->next=NULL;

            if(head==NULL)
            {
                head=new_student;
            }
            else{
                details*temp=head;
                while(temp->next!=NULL)
                {
                    temp=temp->next;
                }
                temp->next=new_student;
            }
            system("cls");
            cout<<"Insertion of new student's details is done."<<endl;
       }


        void delete_student_details()
        {
            system("cls");
            cout<<setfill('=')<<endl;
            cout<<setw(60)<<"Student Management System"<<setw(35)<<""<<"\n\n"<<endl;
            string temp;
            int count=0;
            if(head==NULL)
            {
                cout<<"Student's list is empty."<<endl;
            }
            else{
                cout<<"Enter the roll number of the student to delete: "<<endl;
                cin>>temp;
                if(temp == head->Roll_No)
                {
                    details*ptr=head;
                    head=head->next;
                    delete ptr;
                    cout<<"Respective student details are deleted."<<endl;
                    count++;
                }
                else{
                    details*prev=head;
                    details*curr=head;
                    while(curr!=NULL)
                    {
                        if(temp==curr->Roll_No)
                        {
                            prev->next=curr->next;
                            delete curr;
                            cout<<"Respective student details are deleted."<<endl;
                            count++;
                            break;
                        }
                        prev=curr;
                        curr=curr->next;
                    }
                }
                if(count==0)
                {
                    cout<<"Invalid Entry!"<<endl;
                }
            }
        }
        void search_student_details()
        {
            system("cls");
            cout<<setfill('=')<<endl;
            cout<<setw(60)<<"Student Management System"<<setw(35)<<""<<"\n\n"<<endl;
            string temp;
            int count=0;
            if(head==NULL)
            {
                cout<<"Student's list is empty."<<endl;
            }
            else{
                cout<<"Enter the roll number of the student to search: "<<endl;
                cin>>temp;
                details*ptr=head;
                while(ptr!=NULL)
                {
                    if(temp==ptr->Roll_No)
                    {
                        system("cls");
                        cout<<setfill('=')<<endl;
                        cout<<setw(60)<<"Student Management System"<<setw(35)<<""<<"\n\n"<<endl;
                        cout<<"Respective student details are: "<<endl;
                        cout<<"Student's Reg No : "<<ptr->Reg_No<<endl;
                        cout<<"Student's Roll No : "<<ptr->Roll_No<<endl;
                        cout<<"Student's Name : "<<ptr->Name<<endl;
                        cout<<"Student's gender : "<<ptr->Gender<<endl;
                        cout<<"Student's Department : "<<ptr->Department<<endl;
                        cout<<"Student's semester Number : "<<ptr->Sem_No<<endl;
                        cout<<"Student's CGPA : "<<ptr->CGPA<<endl;
                        count++;
                    }
                    ptr=ptr->next;
                }
                if(count==0)
                {
                    cout<<"Invalid Entry!"<<endl;
                }
            }
        }
        void update_student_datails()
        {
            system("cls");
            cout<<setfill('=')<<endl;
            cout<<setw(60)<<"Student Management System"<<setw(35)<<""<<"\n\n"<<endl;
            string temp;
            int count=0;
            if(head==NULL)
            {
                cout<<"Student's list is empty."<<endl;
            }
            else{
                cout<<"Enter the roll number of the student to update: "<<endl;
                cin>>temp;
                details*ptr=head;
                while(ptr!=NULL)
                {
                    if(temp==ptr->Roll_No)
                    {
                        cout<<"\nEnter student's Reg No : ";
                        cin>>ptr->Reg_No;
                        cout<<"\nEnter student's Roll No : ";
                        cin>>ptr->Roll_No;
                        cout<<"\nEnter student's Name : ";
                        cin.ignore();
                        getline(cin,ptr->Name);
                        cout<<"\nEnter student's gender(M if male , F if female) : ";
                        cin>>ptr->Gender;
                        cout<<"\nEnter student's Department : ";
                        cin.ignore();
                        getline(cin,ptr->Department);
                        cout<<"\nEnter student's semester Number : ";
                        cin>>ptr->Sem_No;
                        cout<<"\nEnter student's CGPA : ";
                        cin>>ptr->CGPA;

                        count++;
                        system("cls");
                        cout<<"Respective student details are updated."<<endl;
                    }
                    ptr=ptr->next;
                }
                if(count==0)
                {
                    cout<<"Invalid Entry!"<<endl;
                }
            }
        }
        void display_student_details()
        {
            system("cls");
            cout<<setfill('=')<<endl;
            cout<<setw(60)<<"Student Management System"<<setw(35)<<""<<"\n\n"<<endl;
            if(head==NULL)
            {
                cout<<"Student's list is empty."<<endl;
            }
            else{
                details*ptr=head;
                while(ptr!=NULL)
                {
                    cout<<"Student's Reg No : "<<ptr->Reg_No<<endl;
                    cout<<"Student's Roll No : "<<ptr->Roll_No<<endl;
                    cout<<"Student's Name : "<<ptr->Name<<endl;
                    cout<<"Student's gender : "<<ptr->Gender<<endl;
                    cout<<"Student's Department : "<<ptr->Department<<endl;
                    cout<<"Student's semester Number : "<<ptr->Sem_No<<endl;
                    cout<<"Student's CGPA : "<<ptr->CGPA<<endl;
                    ptr=ptr->next;
                }
                cout<<endl;
            }
        }
};

int main()
{
    student stu;
    stu.menu();
}