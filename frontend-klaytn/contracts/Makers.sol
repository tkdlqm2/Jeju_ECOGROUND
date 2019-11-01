pragma solidity ^0.5.6;

import "./ERC721/ERC721.sol";
import "./ERC721/ERC721Enumerable.sol";

contract MakersToken is ERC721, ERC721Enumerable {

    event MakersUploaded
    (uint256 indexed tokenId, bytes photo, string title, string description, string targetKlay, string D_day, uint256 timestamp);

    // Makers 배열
    mapping (uint256 => Makers) public _MakersList; 

    // Makers 마다 모금액 -> 최종 모금액이 얼마인지 확인 하기위해 필요한 mapping
    mapping (uint256 => Makres) public _totalKlayList;
    
    struct Makers{
        uint256 tokenId;
        address[] buyer;
        bytes photo;
        string title;
        string description;
        string targetKlay;
        string D_day;
        uint256 status;
        uint256 timestamp;
    }

    function uploadMakers
    (bytes memory photo, string memory title, string memory description, string memory targetKlay, string memory D_day) public {
        uint256 tokenId = totalSupply() + 1;

        _mint(msg.sender, tokenId);

        address[] memory buyer;

        Makers memory newMakers = Makers({
            tokenId : tokenId, 
            buyer : buyer, // 투자자들
            photo : photo, // 사진
            title : title, // 제목
            description : description, // 설명
            targetKlay : targetKlay, // 목표 금액
            D_day : D_day, // 마감일
            status : 1, // 투자 상태 -> 0 이면 종료 / 1 이면 진행
            timestamp : now
        });

        _MakersList[tokenId] = newMakers;


        emit MakersUploaded(tokenId, photo, title, description, targetKlay, D_day, now);
    }

    function getTotalMakersCount () public view returns (uint) {
        return totalSupply();
    }

    // 메이커스 불러오기
    function getMakers (uint tokenId) public view
    returns(uint256, address[] memory, byte memory, string memory, string memory, string memory, string memory, uint256) {
        require(_MakersList[tokenId].tokenId != 0, "Makres does not exist!");
        return (
            _MakersList[tokenId].tokenId,
            _MakersList[tokenId].photo,
            _MakersList[tokenId].title,
            _MakersList[tokenId].description,
            _MakersList[tokenId].targetKlay,
            _MakersList[tokenId].D_day,
            _MakersList[tokenId].timestamp
        );
    }

    // 메이커스 스톱.
    function stopMakers(uint tokenId) public {
        require(_MakersList[tokenId].tokenId != 0, "Makres does not exist!");
        _MakersList[tokenId].status = 0;

        // 잔액 환불 로직 추가!
    }

    // 메이커스 투자자 명수 보기.
    function howManyInvestors(uint tokenId) public {
        require(_MakersList[tokenId].tokenId != 0, "Makres does not exist!");
        return length(_MakersList[tokenId].buyer);
    }

    // 메이커스 투자하기.
    function investMakers(uint256 tokenId) public payable {
        
        require(msg.sender != ownerOf(tokenId), "error");
        require(_MakersList[tokenId].D_day, "기간이 지남"); // 날짜 유효성 판단을 어떻게 할 지 아직 못정함.
        require(_MakersList[tokenId].targetKlay > _totalKlayList[tokenId],"모금 금액을 모두 달성함");

        address MakersOwner = ownerOf(tokenId);
        address payable payableTokenSeller = address(uint160(MakersOwner));
        payableTokenSeller.transfer(msg.value); // 메이커스 Token의 owner 계정으로 klay 송금

        _totalKlayList[tokenId] += msg.value; // 메이커스 목표 금액을 다루는 list에 klay 추가
        _MakersList[tokenId].buyer.push(msg.sender); // 메이커스 투자자들 push
        
    }
}
